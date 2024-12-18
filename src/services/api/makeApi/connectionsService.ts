import httpClient from "../../httpClient.ts";
import endpoints from "../../endpoints.ts";
import {AxiosResponse} from "axios";

export const getConnections = async (teamId: number): Promise<AxiosResponse<IConnectionResponse[]>> => {
  return httpClient.get(endpoints.makeApi.listConnections, {params: {teamId}})
}

export const createConnection = async (body: IConnectionBody, teamId: number): Promise<AxiosResponse<IConnectionResponse>> => {
  console.log(body, teamId);
  return httpClient.post(endpoints.makeApi.createConnection, body, {params: {teamId}});
}

export const verifyConnection = async (connectionId: number) => {
  return httpClient.post(endpoints.makeApi.verifyConnection.replace(":connectionId", String(connectionId)));
}