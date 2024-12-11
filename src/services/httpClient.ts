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
    const token = import.meta.env.API_TOKEN;
    config.headers.Authorization = dynamicToken;

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response.data
)

export default httpClient;