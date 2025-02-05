 import quickbooksClient from "../../quickbooksClient.ts";
import endpoints from "../../endpoints.ts";
import httpClient from "../../httpClient.ts";
import {AxiosResponse} from "axios";


export const getQueriedResults = (query: string) => {
  return httpClient.get(endpoints.quickbooksApi.getAccounts, {params: {query}})
}