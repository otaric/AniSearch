import axios, { AxiosInstance } from 'axios'

export const MAL: AxiosInstance = axios.create({
  baseURL: 'https://api.jikan.moe/v4/'
})
