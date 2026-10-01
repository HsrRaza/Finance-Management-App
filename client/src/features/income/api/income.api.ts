import axiosInstance from "../../../lib/axios";
import type { AddIncomePayload, IncomeItem } from "../../../types/transaction";

export const getIncomesApi = async (): Promise<IncomeItem[]> => {
  const response = await axiosInstance.get("/income/get");
  const data = response.data.data || response.data;
  return (Array.isArray(data) ? data : []).map((item: Record<string, unknown>) => ({
    ...(item as unknown as IncomeItem),
    type: "income",
    date: (item.date as string) || (item.createdAt as string),
  }));
};

export const addIncomeApi = async (payload: AddIncomePayload): Promise<IncomeItem> => {
  const response = await axiosInstance.post("/income/add", payload);
  return response.data.data || response.data;
};

export const deleteIncomeApi = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/income/${id}`);
};

export const downloadIncomeExcelApi = async (): Promise<Blob> => {
  const response = await axiosInstance.get("/income/downloadExcel", {
    responseType: "blob",
  });
  return response.data;
};
