import axios from "axios";

export const api = axios.create({
  baseURL: 'http://mpads.vps-kinghost.net:3333/',
})