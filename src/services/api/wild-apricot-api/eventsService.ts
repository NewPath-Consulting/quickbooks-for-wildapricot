import wildApricotClient from "../../wildApricotClient.ts";
import endpoints from "../../endpoints.ts";


export const getEventTags = async (accountId: string) => {
  return wildApricotClient.get(endpoints.wildApricotApi.getEventTags.replace(':accountId', accountId))
}
