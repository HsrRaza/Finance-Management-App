import type { Transaction } from "./transaction";

export interface CategorySummary {
  category: string;
  amount: number;
  percentage: number;
  color?: string;
}

export interface ChartDataPoint {
  date: string;
  income: number;
  expense: number;
}

export interface DashboardSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  balanceChangePercentage?: number;
  incomeChangePercentage?: number;
  expenseChangePercentage?: number;
  balanceTrend?: number;
  incomeTrend?: number;
  expenseTrend?: number;
  last30DaysExpense: number;
  last60DaysIncome: number;
  recentTransactions: Transaction[];
  categoryBreakdown: CategorySummary[];
  chartData: ChartDataPoint[];
  monthlyData?: { month: string; income: number; expense: number }[];
}
