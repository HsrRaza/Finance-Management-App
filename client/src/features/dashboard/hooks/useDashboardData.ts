import { useQuery } from "@tanstack/react-query";
import { getDashboardDataApi } from "../api/dashboard.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useDashboardData(period: string = "30d") {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(period),
    queryFn: () => getDashboardDataApi(period),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
