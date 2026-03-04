/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      toast.error(data?.message || "Something went wrong");
    } 
    else if (error.request) {
      toast.error("Network error");
    } 
    else {
      toast.error(error.message);
    }

    return Promise.reject({
      message: error.response?.data?.message || error.message || "Something went wrong",
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default axiosInstance;