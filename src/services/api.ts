import axios from "axios";

export const api = axios.create({
  baseURL: 'http://mpadslive.ddns.net/',
})