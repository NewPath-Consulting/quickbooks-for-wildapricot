import httpClient from "../../httpClient.ts";
import endpoints from "../../endpoints.ts";

export const getUserInfo = async () => {
  return httpClient.get(endpoints.makeApi.getUserInfo);
}
