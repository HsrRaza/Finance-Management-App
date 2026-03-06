import axiosInstance from "../utils/axiosInstance";

export const getExpenses = async () => {
    const response = await axiosInstance.get("/expenses");
    return response.data;
}

export const addExpense = async (expense: number) => {
    const response = await axiosInstance.post("/expenses", expense);
    return response.data;
}

export const updateExpense = async (id: string, expense: number) => {
    const response = await axiosInstance.put(`/expenses/${id}`, expense);
    return response.data;
}

export const deleteExpense = async (id: string) => {
    const response = await axiosInstance.delete(`/expenses/${id}`);
    return response.data;
}
