import axios from 'axios';
import { useAuthStore } from "../store/useAuthStore";

const APPLICATION_ID = import.meta.env.VITE_BACKENDLESS_APP_ID;
const REST_API_KEY = import.meta.env.VITE_BACKENDLESS_REST_API_KEY; 

if (!APPLICATION_ID || !REST_API_KEY) {
    console.error("Kesalahan Konfigurasi: Kunci Backendless hilang.");
    throw new Error("Konfigurasi Backendless tidak lengkap.");
}

const BASE_URL = `https://api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { userToken } = useAuthStore.getState();

    if (userToken) {
      config.headers['user-token'] = userToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;