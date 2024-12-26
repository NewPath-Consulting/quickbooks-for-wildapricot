import httpClient from "../../httpClient.ts";
import endpoints from "../../endpoints.ts";
import {AxiosResponse} from "axios";
import {IQBAuthBody} from "../../../typings/IQBAuthBody.ts";

interface IQBAuthResponse {
  accessToken: string,
  refreshToken: string,
  expiresIn: number
}

export const getQuickbooksAccessToken = async (params: IQBAuthBody) => {

  try{
    const response: AxiosResponse<IQBAuthResponse> = await httpClient.get(endpoints.quickbooksApi.getAccessToken, {params})
    const {accessToken, refreshToken} = response;
    localStorage.setItem("qbAccessToken", accessToken);
    localStorage.setItem("qbRefreshToken", refreshToken);
  }
  catch(e) {
    throw new Error("Unable to get access token")
  }

}

export const refreshQuickbooksAccessToken = async (body: IQBAuthBody)=> {
  try {
    const storedRefreshToken = localStorage.getItem("qbRefreshToken");

    if (!storedRefreshToken) {
      throw new Error("No refresh token available");
    }

    const response: AxiosResponse<IQBAuthResponse> = await httpClient.post(endpoints.quickbooksApi.refreshAccessToken, body);

    const {accessToken, refreshToken} = response;

    // Update storage with new tokens
    localStorage.setItem("qbAccessToken", accessToken);
    localStorage.setItem("qbRefreshToken", refreshToken);
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Re-throw the error so that the caller knows something went wrong
  }
}