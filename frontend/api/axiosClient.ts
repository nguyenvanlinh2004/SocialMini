import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";

// Tạo instance Axios
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: new AxiosHeaders({
    "Content-Type": "application/json",
  }),
});

// Interceptor thêm Authorization token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    // đảm bảo headers là AxiosHeaders
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor xử lý lỗi response
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Có thể token hết hạn hoặc không hợp lệ.");
      // Tùy chọn: logout hoặc redirect về login
      // localStorage.removeItem("accessToken");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
