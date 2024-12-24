import axios from "axios"
import endpoints from "./endpoints.ts";


const base64Encode = (apiKey: string): string => {
  const credentials = `APIKEY:${apiKey}`;
  console.log(credentials)
  return btoa(credentials);
};


const wildApricotClient = axios.create({
  baseURL: "https://oauth.wildapricot.org",
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
})

wildApricotClient.interceptors.request.use(
  (config) => {
    if(config.headers.Authorization){
      const token = base64Encode(config.headers.Authorization);
      console.log(token)
      config.headers.Authorization = `Basic ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export const getAccessToken = async (token: string) => {
  try {
    console.log(base64Encode(token))
    const response = await wildApricotClient.post(
      endpoints.wildApricotApi.getAuthToken,
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "auto",
        obtain_refresh_token: true
      }),
      {
        headers: {
          // You can override the Authorization header dynamically here if needed
          Authorization: token,
        },
      }
    );

    localStorage.setItem('wa-access-token', response.data.access_token)
    console.log(response)
    return response.data; // The token will be in `response.data`
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

export default wildApricotClient;