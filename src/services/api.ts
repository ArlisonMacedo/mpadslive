import axios from "axios";

export const api = axios.create({
  baseURL: 'http://191.252.212.139:3333/',
})