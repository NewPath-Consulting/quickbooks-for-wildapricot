import httpClient from "../../httpClient.ts";
import endpoints from "../../endpoints.ts";
import {IScenarioBody, IScenarioResponse} from "../../../typings/IScenarioBody.ts";
import {AxiosResponse} from "axios";

export const getScenarios = async (teamId: number, folderId ?: number): Promise<AxiosResponse<IScenarioResponse[]>> => {
  const params = {teamId, folderId};
  return httpClient.get(endpoints.makeApi.listScenarios, {params})
}
export const createScenario = async (body: IScenarioBody) => {
  return httpClient.post(endpoints.makeApi.createScenario, body,{params: {confirmed: true}})
}
export const getScenarioBlueprint = async (scenarioId) => {
  return httpClient.get(endpoints.makeApi.getScenarioBlueprint.replace(":scenarioId", scenarioId));
}
