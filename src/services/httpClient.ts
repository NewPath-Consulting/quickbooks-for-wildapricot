import axios from "axios"

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
  (response) => response.data
)

export default httpClient;