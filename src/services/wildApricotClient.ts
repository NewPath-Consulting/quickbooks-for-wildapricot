import axios from "axios"
import {refreshWildApricotAccessToken} from "./api/wild-apricot-api/authService.ts";


const wildApricotClient = axios.create({
  baseURL: "https://api.wildapricot.org/v2.2",
  timeout: 10000,
  headers: {
    "Accept": "application/json",
  }
})

wildApricotClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('waAccessToken')}`
    return config
  },
  (error) => Promise.reject(error)
)

wildApricotClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    console.log(originalRequest)
    // If the error is 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      try {
        const apiKey = localStorage.getItem('waApiKey');
        const refreshToken = localStorage.getItem('waRefreshToken');
        await refreshWildApricotAccessToken({apiKey, refreshToken})

        // Update the Authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('waAccessToken')}`;
        return wildApricotClient(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Optional: Redirect to login or show an error
        return Promise.reject(refreshError);
      }
    }

    // If not 401 or retry failed, reject the error
    return Promise.reject(error);
  }
)

export default wildApricotClient;