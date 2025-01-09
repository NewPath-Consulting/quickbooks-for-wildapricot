import axios from "axios"
import {refreshQuickbooksAccessToken} from "./api/quickbooks-api/authService.ts";
import quickbooksClient from "./quickbooksClient.ts";

let dynamicToken: string;

export const setAuth = (token: string) => {
  dynamicToken = token;
}

const httpClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
})

httpClient.interceptors.request.use(
  (config) => {

    if(config.url.includes("makeApi")){
      console.log(config)
      const token = import.meta.env.API_TOKEN;
      config.headers.Authorization = dynamicToken;
    }
    else if(config.url.includes("quickbooks")){
      config.headers.Authorization = localStorage.getItem("qbAccessToken");
      config.headers.realmId = localStorage.getItem("qbRealmId");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 and we haven't already retried
    if (originalRequest.url.includes("quickbooks") && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      try {
        const clientId = localStorage.getItem('qbClientId');
        const clientSecret = localStorage.getItem('qbClientSecret');
        const refreshToken = localStorage.getItem('qbRefreshToken');
        await refreshQuickbooksAccessToken({clientId, clientSecret, refreshToken})

        // Update the Authorization header and retry the original request
        originalRequest.headers.Authorization = localStorage.getItem('qbAccessToken');
        return httpClient(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Optional: Redirect to login or show an error
        return Promise.reject(refreshError);
      }
    }

    // If not 401 or retry failed, reject the error
    return Promise.reject(error);
  })

export default httpClient;