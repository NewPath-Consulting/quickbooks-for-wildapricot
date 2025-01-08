import quickbooksClient from "../../quickbooksClient.ts";
import endpoints from "../../endpoints.ts";
import httpClient from "../../httpClient.ts";


export const getQueriedAccounts = () => {
  return httpClient.get(endpoints.quickbooksApi.getAccounts)
}