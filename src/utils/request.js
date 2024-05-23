import axios from 'axios';

const axiosRequest = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径见配置env
    timeout: 5000,
  });
  
  
  export default axiosRequest;