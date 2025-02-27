import {data} from "react-router-dom";

let localConnectionId; // Local variable to persist connectionId across iterations
export const setConnectionValue = (obj, targetField: string, connections: IConnectionResponse[], connectionId: number = 0) => {

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === targetField) {
        if (typeof obj[key] === "number") {
          obj[key] = localConnectionId;
        } else {
          localConnectionId = connections
            .find((val) => val.accountName === obj[key]?.data?.connection)?.id;
        }
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        setConnectionValue(obj[key], targetField, connections); // Pass connectionId to recursive calls
      }
    }
  }
}

export const setDataRecordKey = (obj, dataRecordKey: string) => {

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {

      if ((key === "ConfigKey" && !obj[key].includes("{{"))) {
        obj[key] = dataRecordKey;
      }
      else if(key === "variables" && Array.isArray(obj[key])) {
        const configKeyObj = obj[key]?.find(val => val["name"] === "ConfigKey")

        if(configKeyObj){
          configKeyObj["value"] = dataRecordKey
        }
      }
      else if (typeof obj[key] === "object" && obj[key] !== null) {
        setDataRecordKey(obj[key], dataRecordKey); // Pass connectionId to recursive calls
      }
    }
  }
}

export const setDataStoreValue =(obj, dataStoreId) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "datastore" && typeof obj[key] == "number") {
        obj[key] = parseInt(dataStoreId);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        setDataStoreValue(obj[key], dataStoreId); // Recurse into nested objects
      }
    }
  }
}

export const setJSONValue = (obj, dataStructureMap: Map<number, number>) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "type" && typeof obj[key] == "number") {
        obj[key] = dataStructureMap.get(obj[key]);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        setJSONValue(obj[key], dataStructureMap); // Recurse into nested objects
      }
    }
  }
}

export const setWebhookValues = (obj, webhooksMap) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "hook" && typeof obj[key] === "number") {
        // Replace webhook ID with the new one from the map
        const newWebhookId = webhooksMap.get(obj[key]);
        if (newWebhookId) {
          obj[key] = newWebhookId;
        }
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        setWebhookValues(obj[key], webhooksMap);
      }
    }
  }
};

const updateWebhookUrls = (blueprint, webhookMap) => {
  // Find references to webhook URLs in the blueprint and replace them

  const replaceUrls = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Check if we found a mapper object with a url property that contains a Make.com webhook URL
        if (key === "mapper" && obj[key] &&
          typeof obj[key].url === "string" &&
          obj[key].url.includes("hook")) {

          // Extract the webhook ID from the URL (the part after the last slash)
          const urlParts = obj[key].url.split('/');
          const webhookId = urlParts[urlParts.length - 1];

          // Check if we have this webhook in our map
          for (const [originalId, webhookInfo] of webhookMap.entries()) {
            // If the webhook IDs match or if the URL contains the original ID
            if (webhookId === originalId || obj[key].url.includes(`/${originalId}`)) {
              // Replace with the new webhook URL
              obj[key].url = webhookInfo.url;
              console.log(`Updated webhook URL from ${originalId} to ${webhookInfo.url}`);
              break;
            }
          }
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          // Recursively search nested objects
          replaceUrls(obj[key]);
        }
      }
    }
  };

  replaceUrls(blueprint);
};
