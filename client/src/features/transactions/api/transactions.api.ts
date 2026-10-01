import axiosInstance from "../../../lib/axios";
import type { Transaction, TransactionFilters } from "../../../types/transaction";
import type { PaginatedResponse } from "../../../types/common";
import { getIncomesApi } from "../../income/api/income.api";
import { getExpensesApi } from "../../expenses/api/expense.api";

export const getTransactionsApi = async (
  filters?: TransactionFilters
): Promise<PaginatedResponse<Transaction>> => {
  try {
    const params = new URLSearchParams();
    if (filters?.type && filters.type !== "all") params.append("type", filters.type);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.search) params.append("search", filters.search);
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await axiosInstance.get(`/transactions${queryString}`);
    
    if (response.data?.data?.items) {
      return response.data.data;
    }
  } catch {
    // Fallback: merge incomes and expenses client-side
  }

  const [incomes, expenses] = await Promise.all([getIncomesApi(), getExpensesApi()]);

  let combined: Transaction[] = [...incomes, ...expenses];

  if (filters?.type && filters.type !== "all") {
    combined = combined.filter((t) => t.type === filters.type);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    combined = combined.filter((t) => {
      const titleOrSource = t.type === "income" ? t.source : t.title || t.category;
      return titleOrSource.toLowerCase().includes(searchLower) || t.category?.toLowerCase().includes(searchLower);
    });
  }

  combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const startIndex = (page - 1) * limit;
  const items = combined.slice(startIndex, startIndex + limit);

  return {
    items,
    total: combined.length,
    page,
    limit,
    totalPages: Math.ceil(combined.length / limit) || 1,
  };
};
