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
