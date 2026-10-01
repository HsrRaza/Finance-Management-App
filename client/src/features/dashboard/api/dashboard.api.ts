import axiosInstance from "../../../lib/axios";
import type { DashboardSummary } from "../../../types/dashboard";

export const getDashboardDataApi = async (period: string = "30d"): Promise<DashboardSummary> => {
  const response = await axiosInstance.get(`/dashboard?period=${period}`);
  const data = response.data.data || response.data;
  return data;
};
