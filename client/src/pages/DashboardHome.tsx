import React, { useState } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus, BookOpen } from "lucide-react";
import { useDashboardData } from "../features/dashboard/hooks/useDashboardData";
import { StatCard } from "../features/dashboard/components/StatCard";
import { TransactionList } from "../features/transactions/components/TransactionList";
import { AddTransactionModal } from "../features/transactions/components/AddTransactionModal";
import { IncomeExpenseAreaChart } from "../components/charts/IncomeExpenseAreaChart";
import { CategoryPieChart } from "../components/charts/CategoryPieChart";
import { MonthlyBarChart } from "../components/charts/MonthlyBarChart";
import { Button } from "../components/ui/Button";

export const DashboardHome: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState<string>("30d");

  const { data, isLoading } = useDashboardData(period);

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E0D8] dark:border-[#2E3742]">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1F5C4A] dark:text-[#34A887] uppercase tracking-widest mb-0.5">
            <BookOpen className="h-3.5 w-3.5" />
            Financial Statement
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
            Overview & Cash Flow
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Record Entry
          </Button>
        </div>
      </div>

      {/* Primary Financial Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Net Balance"
          amount={data?.totalBalance ?? 0}
          changePercentage={data?.balanceTrend ?? data?.balanceChangePercentage ?? 0}
          icon={<Wallet className="h-4.5 w-4.5" />}
          variant="balance"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Income"
          amount={data?.totalIncome ?? 0}
          changePercentage={data?.incomeTrend ?? data?.incomeChangePercentage ?? 0}
          periodLabel="vs previous period"
          icon={<TrendingUp className="h-4.5 w-4.5" />}
          variant="income"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Expenses"
          amount={data?.totalExpense ?? 0}
          changePercentage={data?.expenseTrend ?? data?.expenseChangePercentage ?? 0}
          periodLabel="vs previous period"
          icon={<TrendingDown className="h-4.5 w-4.5" />}
          variant="expense"
          isLoading={isLoading}
        />
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncomeExpenseAreaChart
            data={data?.chartData || []}
            isLoading={isLoading}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>
        <div className="lg:col-span-1">
          <CategoryPieChart
            data={data?.categoryBreakdown || []}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Monthly Breakdown & Recent Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MonthlyBarChart
            data={
              data?.monthlyData?.map((m) => ({
                date: m.month,
                income: m.income,
                expense: m.expense,
              })) || data?.chartData || []
            }
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-2">
          <TransactionList
            transactions={data?.recentTransactions || []}
            isLoading={isLoading}
            title="Recent Journal Entries"
          />
        </div>
      </div>

      {/* Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DashboardHome;