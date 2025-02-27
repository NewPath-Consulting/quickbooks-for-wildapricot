import httpClient from "../../httpClient.ts";
import endpoints from "../../endpoints.ts";
import {AxiosResponse} from "axios";

export interface HookResponse {
  id: number,
  name: string,
  url: string,
  scenarioId: number,
  teamId: number
}

export const getHooks = async (teamId: number): Promise<AxiosResponse<HookResponse[]>> => {
  return httpClient.get(endpoints.makeApi.hooks, {params: {teamId}})
}

export const createHook = async (body: number): Promise<AxiosResponse<HookResponse>> => {
  return httpClient.post(endpoints.makeApi.hooks, body)
}