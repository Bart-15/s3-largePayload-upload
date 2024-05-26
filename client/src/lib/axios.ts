import axios, {AxiosInstance} from 'axios';

export const axiosPublic: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});
