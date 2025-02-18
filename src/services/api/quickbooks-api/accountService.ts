import endpoints from "../../endpoints.ts";
import httpClient from "../../httpClient.ts";


export const getQueriedResults = (query: string) => {
  return httpClient.get(endpoints.quickbooksApi.getAccounts, {params: {query}})
}

export const configureQuickBooksUrl = (apiUrl: string) => {
  return httpClient.post(endpoints.quickbooksApi.configureUrl, {apiUrl})
}