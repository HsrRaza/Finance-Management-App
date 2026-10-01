import axiosInstance from "../../../lib/axios";
import type { AddExpensePayload, ExpenseItem } from "../../../types/transaction";

export const getExpensesApi = async (): Promise<ExpenseItem[]> => {
  const response = await axiosInstance.get("/expense/get");
  const data = response.data.data || response.data;
  return (Array.isArray(data) ? data : []).map((item: Record<string, unknown>) => ({
    ...(item as unknown as ExpenseItem),
    type: "expense",
    date: (item.date as string) || (item.createdAt as string),
  }));
};

export const addExpenseApi = async (payload: AddExpensePayload): Promise<ExpenseItem> => {
  const response = await axiosInstance.post("/expense/add", payload);
  return response.data.data || response.data;
};

export const deleteExpenseApi = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/expense/${id}`);
};

export const downloadExpenseExcelApi = async (): Promise<Blob> => {
  const response = await axiosInstance.get("/expense/downloadExcel", {
    responseType: "blob",
  });
  return response.data;
};
