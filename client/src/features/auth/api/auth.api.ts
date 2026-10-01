import axiosInstance from "../../../lib/axios";
import type { LoginPayload, RegisterPayload, User } from "../../../types/auth";
import type { ApiResponse } from "../../../types/common";

export const loginApi = async (payload: LoginPayload): Promise<{ user: User; token: string }> => {
  const response = await axiosInstance.post("/auth/login", payload);
  const data = response.data;
  const user = data.user || data.data?.user || data.data;
  const token = data.token || data.accessToken || data.data?.accessToken;
  return { user, token };
};

export const registerApi = async (payload: RegisterPayload): Promise<{ user: User; token?: string }> => {
  const response = await axiosInstance.post("/auth/signup", payload);
  const data = response.data;
  return {
    user: data.user || data.data?.user || data.data,
    token: data.token || data.accessToken || data.data?.accessToken,
  };
};

export const getMeApi = async (): Promise<User> => {
  const response = await axiosInstance.get<ApiResponse<User>>("/auth/me");
  return response.data.data;
};

export const uploadAvatarApi = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post("/auth/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};
