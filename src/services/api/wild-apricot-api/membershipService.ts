import wildApricotClient from "../../wildApricotClient.ts";
import endpoints from "../../endpoints.ts";
import {AxiosResponse} from "axios";

export interface IMembershipLevel {
  Name: string,
  Id: number,
  Type: string
}

export const getMembershipLevels = async(accountId: string): Promise<IMembershipLevel[]> => {
  try{
    const response: AxiosResponse<IMembershipLevel[]> = await wildApricotClient.get(endpoints.wildApricotApi.getMembershipLevels.replace(':accountId', accountId));
    return response.data
  }
  catch (e){
    throw new Error(e.message)
  }
}
