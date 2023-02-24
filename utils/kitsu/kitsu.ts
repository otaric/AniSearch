import axios, { AxiosInstance } from "axios";

export const Kitsu: AxiosInstance = axios.create({
  baseURL: "https://kitsu.io/api/edge/",
});
