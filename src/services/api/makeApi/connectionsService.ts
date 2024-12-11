import httpClient from "../../httpClient.ts";
import endpoints from "../../endpoints.ts";

export const getConnections = async (teamId: number) => {
  return httpClient.get(endpoints.makeApi.listConnections, {params: {teamId}})
}

export const createConnection = async (body: IConnectionBody, teamId: number) => {
  console.log(body, teamId);
  return httpClient.post(endpoints.makeApi.createConnection, body, {params: {teamId}});
}

export const verifyConnection = async (connectionId: number) => {
  return httpClient.post(endpoints.makeApi.verifyConnection.replace(":connectionId", String(connectionId)));
}