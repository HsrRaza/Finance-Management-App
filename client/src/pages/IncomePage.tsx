import React, { useState } from "react";
import { Plus, Download, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { useIncomes } from "../features/income/hooks/useIncomes";
import { downloadIncomeExcelApi } from "../features/income/api/income.api";
import { StatCard } from "../features/dashboard/components/StatCard";
import { TransactionList } from "../features/transactions/components/TransactionList";
import { AddTransactionModal } from "../features/transactions/components/AddTransactionModal";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";

export const IncomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { incomes, isLoading, deleteIncome } = useIncomes();

  const totalIncome = incomes.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadIncomeExcelApi();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Income_Report.xlsx";
      a.click();
      toast.success("Income statement exported!");
    } catch {
      toast.error("Failed to download Excel report.");
    }
  };

  const formattedIncomes = incomes.map((i) => ({
    ...i,
    type: "income" as const,
    title: i.source,
  }));

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E0D8] dark:border-[#2E3742]">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1F5C4A] dark:text-[#34A887] uppercase tracking-widest mb-0.5">
            <TrendingUp className="h-3.5 w-3.5" />
            Revenue & Inflow Ledger
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
            Income Streams
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleDownloadExcel} className="gap-2">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Income
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Income Inflow"
          amount={totalIncome}
          changePercentage={12.4}
          icon={<ArrowUpRight className="h-4.5 w-4.5" />}
          variant="income"
          isLoading={isLoading}
        />
        <StatCard
          title="Recorded Income Entries"
          amount={incomes.length}
          periodLabel="total items logged"
          icon={<Calendar className="h-4.5 w-4.5" />}
          variant="balance"
          isLoading={isLoading}
        />
        <StatCard
          title="Average Inflow per Entry"
          amount={incomes.length > 0 ? totalIncome / incomes.length : 0}
          icon={<TrendingUp className="h-4.5 w-4.5" />}
          variant="income"
          isLoading={isLoading}
        />
      </div>

      {/* Income Records List */}
      <TransactionList
        transactions={formattedIncomes}
        isLoading={isLoading}
        title="Income Journal Entries"
        onDelete={(id) => deleteIncome(id)}
      />

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultType="income"
      />
    </div>
  );
};

export default IncomePage;