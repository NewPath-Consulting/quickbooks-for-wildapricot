import wildApricotClient from "../../wildApricotClient.ts";
import endpoints from "../../endpoints.ts";


export const getDonationFields = (accountId: string) => {
  return wildApricotClient.get(endpoints.wildApricotApi.getDonationFields.replace(':accountId', accountId));
}