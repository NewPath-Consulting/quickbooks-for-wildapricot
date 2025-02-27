import {
  createDataRecord,
  createDataStore,
  createDataStructure, deleteDataStore, deleteDataStructure,
  getDataStructures
} from "../services/api/make-api/dataStructuresService.ts";
import {
  createScenario,
  deleteScenario,
  getScenarioBlueprint,
  getScenarios
} from "../services/api/make-api/scenariosService.ts";
import {
  setConnectionValue,
  setDataRecordKey,
  setDataStoreValue,
  setJSONValue,
  setWebhookValues
} from "./setParameters.ts";
import {getConnections} from "../services/api/make-api/connectionsService.ts";
import {createHook} from "../services/api/make-api/hooksService.ts";

export const cloneConfiguration = async (data) => {
  // Track resources created to enable potential rollback
  const createdResources = {
    dataStructures: [],
    dataStore: null,
    dataRecord: null,
    scenarios: []
  };

  try {
    // Step 1: Clone Data Structures
    const { dataStructureMap, dataStructureId } = await cloneDataStructures(createdResources);
    if (!dataStructureId) {
      throw new Error("Data Structure Cloning Failed");
    }

    // Step 2: Create Data Store
    const dataStoreId = await createDataStoreStep(dataStructureId, createdResources);
    if (!dataStoreId) {
      throw new Error("Data Store Creation Failed");
    }

    // Step 3: Post Data Record
    const dataRecordId = await postDataRecordStep(createdResources, data);
    if (!dataRecordId) {
      throw new Error("Data Record Creation Failed");
    }

    // Step 4: Clone Scenarios
    await cloneScenariosStep(dataStructureMap, createdResources);

    // try {
    //   await rollbackCreatedResources(createdResources);
    // } catch (rollbackError) {
    //   console.error("Rollback Failed:", rollbackError);
    // }

    return createdResources;
  } catch (mainError) {
    console.error("Configuration Cloning Failed:", mainError);

    // Rollback mechanism
    try {
      await rollbackCreatedResources(createdResources);
    } catch (rollbackError) {
      console.error("Rollback Failed:", rollbackError);
    }

    throw mainError;
  }
};

const cloneDataStructures = async (createdResources) => {
  const dataStructureMap = new Map();
  let firstDataStructureId = null;

  try {
    const response = await getDataStructures();
    const dataStructures = response.data

    for (let i = 0; i < 9; i++) {
      try {
        const dataStructureDetails = await createDataStructure({
          spec: dataStructures[i].spec,
          name: dataStructures[i].name,
          teamId: 740495
        });

        // Track created data structure
        createdResources.dataStructures.push(dataStructureDetails.data.dataStructure.id);

        // Map old structure ID to new structure ID
        dataStructureMap.set(dataStructures[i].id, dataStructureDetails.data.dataStructure.id);

        // Keep track of first data structure ID
        if (i === 0) {
          firstDataStructureId = dataStructureDetails.data.dataStructure.id;
        }
      } catch (structureError) {
        console.error(`Failed to clone data structure ${i}:`, structureError);
        // Fail fast - stop entire process if any structure fails
        throw structureError;
      }
    }

    return { dataStructureMap, dataStructureId: firstDataStructureId };
  } catch (error) {
    console.error("Data Structures Cloning Failed:", error);
    throw error;
  }
};

const createDataStoreStep = async (dataStructureId, createdResources) => {
  try {
    const dataStoreResponse = await createDataStore({
      datastructureId: dataStructureId,
      name: 'QBWA Test',
      teamId: 740495
    });

    // Track created data store
    createdResources.dataStore = dataStoreResponse.data.dataStore.id;

    return dataStoreResponse.data.dataStore.id;
  } catch (error) {
    console.error("Data Store Creation Failed:", error);
    throw error;
  }
};

const postDataRecordStep = async (createdResources, data) => {
  try {
    const response = await createDataRecord({
      id: createdResources.dataStore,
      data,
      key: 'ca72cb0afc44'
    });

    // Track created data record
    createdResources.dataRecord = response.data.key;

    return response.data.key;
  } catch (error) {
    console.error("Data Record Creation Failed:", error);
    throw error;
  }
};


const rollbackCreatedResources = async (createdResources) => {
  try {
    // Rollback scenarios
    if (createdResources.scenarios.length) {
      await Promise.all(
        createdResources.scenarios.map(scenarioId => deleteScenario(String(scenarioId)))
      );
    }


    // Rollback data store
    if (createdResources.dataStore) {
      await deleteDataStore([String(createdResources.dataStore)], 740495);
    }

    // Rollback data structures
    if (createdResources.dataStructures.length) {
      await Promise.all(
        createdResources.dataStructures.map(structureId => deleteDataStructure(String(structureId)))
      );
    }
  } catch (rollbackError) {
    console.error("Complete Rollback Failed", rollbackError);
    // Log critical error - manual intervention might be needed
    throw rollbackError;
  }
};

const cloneScenariosStep = async (dataStructureMap, createdResources) => {
  try {
    const scenarios = await getScenarios();
    const connection = await getConnections(740495)
    const webhooksMap = new Map(); // Store original webhook ID → new webhook ID mapping

    for (const scenario of scenarios.data) {
      try {
        const blueprintResponse = await getScenarioBlueprint(scenario.id);
        const blueprint = blueprintResponse.data.data;

        const webhookReferences = extractWebhookReferences(blueprint);

        // Create new webhooks for each reference found
        for (const webhookRef of webhookReferences) {
          if (!webhooksMap.has(webhookRef.id)) {
            // Create new webhook with necessary configuration
            const newWebhook = await createHook({
              name: `Cloned: ${webhookRef.name}`,
              teamId: 740495,
              stringify: false,
              method: false,
              typeName: 'gateway-webhook',
              headers: false
            });

            webhooksMap.set(webhookRef.id, newWebhook.data.id);
          }
        }

        console.log(webhooksMap)

        // Modify blueprint with new mappings
        setConnectionValue(blueprint, "__IMTCONN__", connection.data.data);
        setDataStoreValue(blueprint, createdResources.dataStore);
        setJSONValue(blueprint, dataStructureMap);
        setDataRecordKey(blueprint, createdResources.dataRecord)
        setWebhookValues(blueprint, webhooksMap); // New function to replace webhook references

        // Create scenario
        const createdScenario = await createScenario({
          scheduling: "{ \"type\": \"indefinitely\", \"interval\": 900 }",
          teamId: 740495,
          folderId: 246724,
          blueprint: JSON.stringify(blueprint)
        });

        // Track created scenarios
        createdResources.scenarios.push(createdScenario.data.scenario.id);
      } catch (scenarioError) {
        console.error(`Failed to clone scenario:`, scenarioError);
        // Fail fast - stop entire process if any scenario fails
        throw scenarioError;
      }
    }
  } catch (error) {
    console.error("Scenarios Cloning Failed:", error);
    throw error;
  }
};

const extractWebhookReferences = (blueprint) => {
  const webhookRefs = [];
  // Implement logic to traverse blueprint and find webhook references
  // This will depend on how webhooks are represented in your blueprints

  const findWebhooks = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Look for webhook identifiers in the blueprint structure
        // This might be something like a "webhook" field or a specific pattern
        if (key === "hook" && typeof obj[key] === "number") {
          webhookRefs.push({
            id: obj[key],
            name: obj.name || `Webhook-${obj[key]}`
          });
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          findWebhooks(obj[key]);
        }
      }
    }
  };

  findWebhooks(blueprint);
  return webhookRefs;
};