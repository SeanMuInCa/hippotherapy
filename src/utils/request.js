import axios from "axios";

const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //env
  timeout: 5000,
});
console.log(axiosRequest.baseURL);
export default axiosRequest;
