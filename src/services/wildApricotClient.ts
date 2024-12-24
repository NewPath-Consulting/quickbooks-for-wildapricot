import axios from "axios"


const wildApricotClient = axios.create({
  baseURL: "https://api.wildapricot.org/v2.2",
  timeout: 10000,
  headers: {
    "Accept": "application/json",
  }
})

wildApricotClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('wa-access-token')}`
    return config
  },
  (error) => Promise.reject(error)

)

export default wildApricotClient;