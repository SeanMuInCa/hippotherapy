import axios from "axios";
/**
 * axios request config instance
 */
const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //env
  timeout: 5000,
});
export default axiosRequest;
