import httpClient from "../../httpClient.ts";
import endpoints from "../../endpoints.ts";
import {AxiosResponse} from "axios";
import {IQBAuthBody} from "../../../typings/IQBAuthBody.ts";
import {IWAAuthBody, IWALoginBody} from "../../../typings/IWAAuthBody.ts";

interface IWAAuthResponse {
  accessToken: string,
  refreshToken: string,
  expiresIn: number
}

export const getWildApricotAccessToken = async (body: IWAAuthBody) => {

  try{
    const response: AxiosResponse<IWAAuthResponse> = await httpClient.post(endpoints.wildApricotApi.getAccessToken, body)
    const {accessToken, refreshToken} = response;
    localStorage.setItem("waAccessToken", accessToken);
    localStorage.setItem("waRefreshToken", refreshToken);
  }
  catch(e) {
    throw new Error("Unable to get access token")
  }
}

export const wildApricotLogin = async (params: IWALoginBody) => {
  return httpClient.get(endpoints.wildApricotApi.login, {params})
}

export const refreshWildApricotAccessToken = async (body: IWAAuthBody)=> {
  try {

    if (!body.refreshToken) {
      throw new Error("No refresh token available");
    }

    const response: AxiosResponse<IWAAuthResponse> = await httpClient.post(endpoints.wildApricotApi.refreshAccessToken, body);

    const {accessToken, refreshToken} = response;

    // Update storage with new tokens
    localStorage.setItem("waAccessToken", accessToken);
    localStorage.setItem("waRefreshToken", refreshToken);
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Re-throw the error so that the caller knows something went wrong
  }
}