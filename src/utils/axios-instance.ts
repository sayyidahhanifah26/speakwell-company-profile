import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_RANDOMUSER_API,
  timeout: 10000,
});

export default axiosInstance;
