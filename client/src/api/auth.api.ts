import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data;
}

export const registerUser = async(name:string, email:string, password:string)=>{
    const response = await axiosInstance.post("/auth/signup", { name, email, password });
    return response.data;
}

export const getMe = async()=>{
    const response = await axiosInstance.get("/auth/me");
    return response.data.data;
}

