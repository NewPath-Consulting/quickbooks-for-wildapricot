import {
  createDataRecord,
  createDataStore,
  createDataStructure,
  getDataStructures
} from "../services/api/make-api/dataStructuresService.ts";
import {teamId} from "../FirstDraft.tsx";
import {createScenario, getScenarioBlueprint, getScenarios} from "../services/api/make-api/scenariosService.ts";
import {setConnectionValue, setDataStoreValue, setJSONValue} from "./setParameters.ts";
import {data} from "react-router-dom";

export const cloneConfiguration = async () => {
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
    const dataRecordId = await postDataRecordStep(createdResources);
    if (!dataRecordId) {
      throw new Error("Data Record Creation Failed");
    }

    // Step 4: Clone Scenarios
    await cloneScenariosStep(dataStructureMap, createdResources);

    return createdResources;
  } catch (mainError) {
    console.error("Configuration Cloning Failed:", mainError);

    // Rollback mechanism
    // try {
    //   await rollbackCreatedResources(createdResources);
    // } catch (rollbackError) {
    //   console.error("Rollback Failed:", rollbackError);
    // }

    throw mainError;
  }
};

const cloneDataStructures = async (createdResources) => {
  const dataStructureMap = new Map();
  let firstDataStructureId = null;

  try {
    const dataStructures = await getDataStructures(297);

    for (let i = 0; i < dataStructures.data.length; i++) {
      try {
        const dataStructureDetails = await createDataStructure({
          spec: dataStructures[i].spec,
          name: dataStructures[i].name,
          teamId: teamId
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
      teamId: teamId
    });

    // Track created data store
    createdResources.dataStore = dataStoreResponse.data.dataStore.id;

    return dataStoreResponse.data.dataStore.id;
  } catch (error) {
    console.error("Data Store Creation Failed:", error);
    throw error;
  }
};

const postDataRecordStep = async (createdResources) => {
  try {
    const response = await createDataRecord({
      id: 63007,
      data: {
        // Your existing data record creation logic
      }
    });

    // Track created data record
    createdResources.dataRecord = response.data.id;

    return response.data.id;
  } catch (error) {
    console.error("Data Record Creation Failed:", error);
    throw error;
  }
};

const cloneScenariosStep = async (dataStructureMap, createdResources) => {
  try {
    const scenarios = await getScenarios(297, 188054);

    for (const scenario of scenarios) {
      try {
        if (scenario.id === 3004248) {
          const blueprintResponse = await getScenarioBlueprint(scenario.id);
          const blueprint = blueprintResponse.data;

          // Modify blueprint with new mappings
          setConnectionValue(blueprint, "__IMTCONN__", onBoardingData.connections);
          setDataStoreValue(blueprint, 63007);
          setJSONValue(blueprint, dataStructureMap);

          // Create scenario
          const createdScenario = await createScenario({
            scheduling: "{ \"type\": \"indefinitely\", \"interval\": 900 }",
            teamId: teamId,
            blueprint: JSON.stringify(blueprint)
          });

          // Track created scenarios
          createdResources.scenarios.push(createdScenario.data.id);
        }
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

// const rollbackCreatedResources = async (createdResources) => {
//   try {
//     // Rollback scenarios
//     if (createdResources.scenarios.length) {
//       await Promise.all(
//         createdResources.scenarios.map(scenarioId => deleteScenario(scenarioId))
//       );
//     }
//
//     // Rollback data record
//     if (createdResources.dataRecord) {
//       await deleteDataRecord(createdResources.dataRecord);
//     }
//
//     // Rollback data store
//     if (createdResources.dataStore) {
//       await deleteDataStore(createdResources.dataStore);
//     }
//
//     // Rollback data structures
//     if (createdResources.dataStructures.length) {
//       await Promise.all(
//         createdResources.dataStructures.map(structureId => deleteDataStructure(structureId))
//       );
//     }
//   } catch (rollbackError) {
//     console.error("Complete Rollback Failed", rollbackError);
//     // Log critical error - manual intervention might be needed
//     throw rollbackError;
//   }
// };

// Usage in component