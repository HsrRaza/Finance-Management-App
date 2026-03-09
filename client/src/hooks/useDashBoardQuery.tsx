import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboard.api";

export const useDashBoardQuery = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    staleTime: 1000 * 60 * 5, 
  });
};