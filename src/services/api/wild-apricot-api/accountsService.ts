import endpoints from "../../endpoints.ts";
import wildApricotClient from "../../wildApricotClient.ts";
import {AxiosResponse} from "axios";
import {IContactField, IContactInformation} from "../../../typings/IContactInformation.ts";

export const getWildApricotAccounts = async () => {
  return wildApricotClient.get(endpoints.wildApricotApi.getAccounts)
}

export const getContactInfo = async(accountId: number): Promise<AxiosResponse<IContactInformation>> => {
  return wildApricotClient.get(endpoints.wildApricotApi.getContactInfo.replace(":accountId", accountId.toString()))
}

export const getContactFields = async(accountId: number): Promise<AxiosResponse<IContactField[]>> => {
  return wildApricotClient.get(endpoints.wildApricotApi.getContactFields.replace(':accountId', accountId.toString()))
}