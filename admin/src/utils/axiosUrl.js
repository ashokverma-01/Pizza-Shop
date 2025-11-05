import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pizza-shop-3eov.onrender.com",
});

export default axiosInstance;
