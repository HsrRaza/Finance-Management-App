export type TransactionType = "income" | "expense";

export interface BaseTransaction {
  _id: string;
  userId: string;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncomeItem extends BaseTransaction {
  type: "income";
  source: string;
  category?: string;
  icon?: string;
}

export interface ExpenseItem extends BaseTransaction {
  type: "expense";
  category: string;
  title?: string;
  icon?: string;
}

export type Transaction = IncomeItem | ExpenseItem;

export interface AddIncomePayload {
  source: string;
  amount: number;
  date?: string;
  category?: string;
}

export interface AddExpensePayload {
  category: string;
  amount: number;
  title?: string;
  date?: string;
}

export interface TransactionFilters extends Record<string, unknown> {
  type?: "all" | "income" | "expense";
  category?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
