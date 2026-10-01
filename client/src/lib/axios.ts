import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; success?: boolean }>) => {
    if (error.response?.status === 401) {
      // Clear token on 401 Unauthorized
      useAuthStore.getState().logout();
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred. Please try again.";

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
