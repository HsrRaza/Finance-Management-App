import React from "react";
import { ArrowDownRight, ArrowUpRight, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";
import { EmptyState } from "../../../components/ui/EmptyState";
import { formatCurrency, formatDate } from "../../../lib/utils";
import type { Transaction } from "../../../types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onDelete?: (id: string, type: "income" | "expense") => void;
  title?: string;
  action?: React.ReactNode;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading = false,
  onDelete,
  title = "Recent Activity",
  action,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#E2E0D8] dark:border-[#2E3742]">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle>{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <EmptyState
            title="No activity recorded"
            description="Log your financial income or expense entries to start tracking activity."
          />
        ) : (
          <div className="divide-y divide-[#E2E0D8] dark:divide-[#2E3742]">
            {transactions.map((t) => {
              const isIncome = t.type === "income";
              const titleOrSource = isIncome ? t.source : t.title || t.category;
              const dateStr = t.date || t.createdAt;

              return (
                <div
                  key={t._id}
                  className="flex items-center justify-between py-3 group hover:bg-[#EFEEE8]/50 dark:hover:bg-[#2A333D]/40 px-2 -mx-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E0D8] dark:border-[#2E3742] ${
                        isIncome
                          ? "bg-[#EAF3EF] text-[#1F5C4A] dark:bg-[#162B24] dark:text-[#34A887]"
                          : "bg-[#FDF2F2] text-[#B94A4A] dark:bg-[#2C1A1A] dark:text-[#E06C6C]"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#17212B] dark:text-[#F3F4F6]">
                        {titleOrSource}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[#929A9F]">
                          {formatDate(dateStr)}
                        </span>
                        <span className="text-[#E2E0D8] dark:text-[#2E3742]">•</span>
                        <Badge variant={isIncome ? "income" : "expense"}>
                          {t.category || (isIncome ? "Income" : "Expense")}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-serif-editorial text-base font-bold tracking-tight ${
                        isIncome
                          ? "text-[#1F5C4A] dark:text-[#34A887]"
                          : "text-[#B94A4A] dark:text-[#E06C6C]"
                      }`}
                    >
                      {isIncome ? "+" : "-"}{formatCurrency(t.amount)}
                    </span>

                    {onDelete && (
                      <button
                        onClick={() => onDelete(t._id, t.type)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-[#929A9F] hover:text-[#B94A4A] dark:hover:text-[#E06C6C] hover:bg-[#FDF2F2] dark:hover:bg-[#2C1A1A] rounded-md transition-all"
                        title="Delete entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
