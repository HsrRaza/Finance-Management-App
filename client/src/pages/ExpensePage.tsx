import React, { useState } from "react";
import { Plus, Download, TrendingDown, Calendar, ArrowDownRight } from "lucide-react";
import { useExpenses } from "../features/expenses/hooks/useExpenses";
import { downloadExpenseExcelApi } from "../features/expenses/api/expense.api";
import { StatCard } from "../features/dashboard/components/StatCard";
import { TransactionList } from "../features/transactions/components/TransactionList";
import { AddTransactionModal } from "../features/transactions/components/AddTransactionModal";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";

export const ExpensePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expenses, isLoading, deleteExpense } = useExpenses();

  const totalExpense = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadExpenseExcelApi();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Expense_Report.xlsx";
      a.click();
      toast.success("Expense statement exported!");
    } catch {
      toast.error("Failed to download Excel report.");
    }
  };

  const formattedExpenses = expenses.map((e) => ({
    ...e,
    type: "expense" as const,
    title: e.category,
  }));

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E0D8] dark:border-[#2E3742]">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B94A4A] dark:text-[#E06C6C] uppercase tracking-widest mb-0.5">
            <TrendingDown className="h-3.5 w-3.5" />
            Outflow & Spending Register
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
            Expense Log
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleDownloadExcel} className="gap-2">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="danger" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Outflow"
          amount={totalExpense}
          changePercentage={-4.1}
          icon={<ArrowDownRight className="h-4.5 w-4.5" />}
          variant="expense"
          isLoading={isLoading}
        />
        <StatCard
          title="Logged Expense Entries"
          amount={expenses.length}
          periodLabel="total transactions"
          icon={<Calendar className="h-4.5 w-4.5" />}
          variant="balance"
          isLoading={isLoading}
        />
        <StatCard
          title="Average Expense per Entry"
          amount={expenses.length > 0 ? totalExpense / expenses.length : 0}
          icon={<TrendingDown className="h-4.5 w-4.5" />}
          variant="expense"
          isLoading={isLoading}
        />
      </div>

      {/* Expense Records List */}
      <TransactionList
        transactions={formattedExpenses}
        isLoading={isLoading}
        title="Expense Journal Entries"
        onDelete={(id) => deleteExpense(id)}
      />

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultType="expense"
      />
    </div>
  );
};

export default ExpensePage;
