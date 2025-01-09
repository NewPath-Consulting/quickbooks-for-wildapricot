import axios from "axios"
import {refreshWildApricotAccessToken} from "./api/wild-apricot-api/authService.ts";
import {refreshQuickbooksAccessToken} from "./api/quickbooks-api/authService.ts";


const quickbooksClient = axios.create({
  baseURL: `https://sandbox-quickbooks.api.intuit.com/v3/company/${localStorage.getItem('qbRealmId')}`,
  timeout: 10000,
  headers: {
    "Accept": "application/json",
  }
})

quickbooksClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('qbAccessToken')}`
    return config
  },
  (error) => Promise.reject(error)
)

quickbooksClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
)

export default quickbooksClient;