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

export const deleteScenario = async (scenarioId: string) => {
  return httpClient.delete(endpoints.makeApi.deleteScenario.replace(":scenarioId", scenarioId))
}

export const getScenarioBlueprint = async (scenarioId) => {
  return httpClient.get(endpoints.makeApi.getScenarioBlueprint.replace(":scenarioId", scenarioId));
}

export const runScenario =  async (scenarioId) => {
  try{
    return httpClient.post(endpoints.makeApi.runScenarios.replace(":scenarioId", scenarioId), {responsive: true});
  }
  catch(e){
    console.log(e)
  }
}

interface ActivateScenarioResponse {
  id: number,
  islinked: boolean,
  isActive: boolean
}

export const activateScenario =  async (scenarioId): Promise<AxiosResponse<ActivateScenarioResponse>> => {
  try{
    return httpClient.post(endpoints.makeApi.activeScenario.replace(":scenarioId", scenarioId));
  }
  catch(e){
    console.log(e)
  }
}

