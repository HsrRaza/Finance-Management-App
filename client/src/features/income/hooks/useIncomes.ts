import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addIncomeApi, deleteIncomeApi, getIncomesApi } from "../api/income.api";
import { queryKeys } from "../../../lib/queryKeys";
import type { AddIncomePayload } from "../../../types/transaction";

export function useIncomes() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.income.all(),
    queryFn: getIncomesApi,
  });

  const addMutation = useMutation({
    mutationFn: (payload: AddIncomePayload) => addIncomeApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.income.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all() });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteIncomeApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.income.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all() });
    },
  });

  return {
    incomes: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? (query.error as Error).message : null,
    addIncome: addMutation.mutateAsync,
    isAdding: addMutation.isPending,
    deleteIncome: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
