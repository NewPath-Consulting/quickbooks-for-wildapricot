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

export interface HookBody {
  name: string,
  teamId: number,
  typeName: string,
  method: boolean,
  headers: boolean,
  stringify: boolean
}

export const getHooksFromSource = async (): Promise<AxiosResponse<HookResponse[]>> => {
  return httpClient.get(endpoints.makeApi.hooks)
}

export const createHook = async (body: HookBody): Promise<AxiosResponse<HookResponse>> => {
  return httpClient.post(endpoints.makeApi.hooks, body)
}