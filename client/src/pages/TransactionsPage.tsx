import React, { useState } from "react";
import { Search, Filter, Plus, Receipt } from "lucide-react";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import { TransactionList } from "../features/transactions/components/TransactionList";
import { AddTransactionModal } from "../features/transactions/components/AddTransactionModal";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export const TransactionsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"all" | "income" | "expense">("all");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTransactions({
    search,
    type,
    page,
    limit: 10,
  });

  const transactions = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E0D8] dark:border-[#2E3742]">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1F5C4A] dark:text-[#34A887] uppercase tracking-widest mb-0.5">
            <Receipt className="h-3.5 w-3.5" />
            Central Ledger Log
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
            Transaction History
          </h1>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Record Entry
        </Button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#1F262E] border border-[#E2E0D8] dark:border-[#2E3742]">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search by description, source, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#66717C] dark:text-[#9CA3AF] mr-2">
            <Filter className="h-3.5 w-3.5" />
            Type:
          </div>
          <div className="flex rounded-lg bg-[#EFEEE8] dark:bg-[#2A333D] p-0.5 border border-[#E2E0D8] dark:border-[#2E3742]">
            {(["all", "income", "expense"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setPage(1);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                  type === t
                    ? "bg-white dark:bg-[#1F262E] text-[#17212B] dark:text-[#F3F4F6] shadow-2xs"
                    : "text-[#66717C] hover:text-[#17212B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        title={`All Journal Entries (${data?.total || 0})`}
      />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-[#66717C] dark:text-[#9CA3AF]">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TransactionsPage;
