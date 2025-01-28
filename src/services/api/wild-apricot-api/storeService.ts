import wildApricotClient from "../../wildApricotClient.ts";
import endpoints from "../../endpoints.ts";


export const getProductTags = async (accountId: string) => {
  return wildApricotClient.get(endpoints.wildApricotApi.getProductTags.replace(':accountId', accountId))
}
