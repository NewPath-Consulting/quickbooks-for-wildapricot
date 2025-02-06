import httpClient from "../../httpClient.ts";
import endpoints from "../../endpoints.ts";
import {IDataRecordBody, IDataStoreBody, IDataStructureBody} from "../../../typings/IDataStructureBody.ts";
import {AxiosResponse} from "axios";


export const getDataStructures = async (teamId: number): Promise<AxiosResponse<IDataStructureBody[]>> => {

  return httpClient.get(endpoints.makeApi.listDataStructures, {
    params: {
      teamId,
    }
  })
}

export const createDataStructure = async (body: IDataStructureBody) => {
  return httpClient.post(endpoints.makeApi.createDataStructure, {
    ...body,
    strict: true
  })
}

export const createDataStore = async (body: IDataStoreBody) => {
  return httpClient.post(endpoints.makeApi.createDataStore, {
    ...body,
    maxSizeMB: 1
  })
}

export const deleteDataStructure = async (dataStructureId: string) => {
  return httpClient.delete(endpoints.makeApi.deleteDataStructure.replace(":dataStructureId", dataStructureId))
}

export const deleteDataStore = async (ids: string[] , teamId: number) => {

  try {
    const response = await httpClient.delete(endpoints.makeApi.deleteDataStore, {params: {teamId, ids}})
    console.log(response)
  }
  catch(e) {
    console.log(e)
  }
}

export const createDataRecord = async (body: IDataRecordBody) => {
  return httpClient.post(endpoints.makeApi.createDataRecord.replace(":dataStoreId", String(body.id)), body)
}

