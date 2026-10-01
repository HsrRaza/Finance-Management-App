import { useQuery } from "@tanstack/react-query";
import { getTransactionsApi } from "../api/transactions.api";
import { queryKeys } from "../../../lib/queryKeys";
import type { TransactionFilters } from "../../../types/transaction";

export function useTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: () => getTransactionsApi(filters),
  });
}
