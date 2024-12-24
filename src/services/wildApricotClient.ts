import axios from "axios"


const wildApricotClient = axios.create({
  baseURL: "https://api.wildapricot.org/v2.2",
  timeout: 10000,
  headers: {
    "Accept": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('wa-access-token')}`
  }
})

export default wildApricotClient;