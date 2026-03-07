import axiosInstance from "../utils/axiosInstance";

export const getIncomes = async () => {
    const response = await axiosInstance.get("/incomes");
    return response.data;
}

export const addIncome = async (source: string, amount: number) => {
    const response = await axiosInstance.post("/income/add", { source, amount });
    return response.data;
}

export const updateIncome = async (id: string, income: number) => {
    const response = await axiosInstance.put(`/incomes/${id}`, income);
    return response.data;
}

export const deleteIncome = async (id: string) => {
    const response = await axiosInstance.delete(`/incomes/${id}`);
    return response.data;
}