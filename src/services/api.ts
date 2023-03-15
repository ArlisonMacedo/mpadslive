import axios from "axios";

export const api = axios.create({
  baseURL: 'https://mpads.cyclic.app/',
})