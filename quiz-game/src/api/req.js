import axios from "axios";

const axiosInstance = axios.create(
    
    {
    baseURL:"http://127.0.0.1:8000",
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token').slice(1, -1);
      if (token) {
        config.headers.authorization = `Token ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
  
export default axiosInstance;