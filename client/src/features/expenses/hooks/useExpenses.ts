import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addExpenseApi, deleteExpenseApi, getExpensesApi } from "../api/expense.api";
import { queryKeys } from "../../../lib/queryKeys";
import type { AddExpensePayload } from "../../../types/transaction";

export function useExpenses() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.expenses.all(),
    queryFn: getExpensesApi,
  });

  const addMutation = useMutation({
    mutationFn: (payload: AddExpensePayload) => addExpenseApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all() });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteExpenseApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all() });
    },
  });

  return {
    expenses: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? (query.error as Error).message : null,
    addExpense: addMutation.mutateAsync,
    isAdding: addMutation.isPending,
    deleteExpense: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
