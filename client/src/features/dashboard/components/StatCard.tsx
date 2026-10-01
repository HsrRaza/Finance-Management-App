import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/Card";
import { formatCurrency, formatPercentage } from "../../../lib/utils";
import { Skeleton } from "../../../components/ui/Skeleton";

interface StatCardProps {
  title: string;
  amount: number;
  changePercentage?: number;
  periodLabel?: string;
  icon: React.ReactNode;
  variant?: "balance" | "income" | "expense";
  isLoading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  amount,
  changePercentage,
  periodLabel = "vs previous period",
  icon,
  variant = "balance",
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <Skeleton className="h-9 w-36 mb-2" />
        <Skeleton className="h-3 w-28" />
      </Card>
    );
  }

  const isPositive = (changePercentage ?? 0) > 0;
  const isNegative = (changePercentage ?? 0) < 0;

  const iconBgClasses = {
    balance: "bg-[#EFEEE8] text-[#1F5C4A] dark:bg-[#2A333D] dark:text-[#34A887]",
    income: "bg-[#EAF3EF] text-[#1F5C4A] dark:bg-[#162B24] dark:text-[#34A887]",
    expense: "bg-[#FDF2F2] text-[#B94A4A] dark:bg-[#2C1A1A] dark:text-[#E06C6C]",
  };

  return (
    <Card className="relative overflow-hidden group">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#66717C] dark:text-[#9CA3AF] uppercase tracking-wider">
            {title}
          </span>
          <div className={`p-2 rounded-lg border border-[#E2E0D8] dark:border-[#2E3742] ${iconBgClasses[variant]}`}>
            {icon}
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <h2 className="font-serif-editorial text-3xl font-bold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
            {formatCurrency(amount)}
          </h2>
        </div>

        {changePercentage !== undefined && (
          <div className="flex items-center gap-1.5 mt-3 text-xs font-medium">
            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold ${
                isPositive
                  ? "bg-[#EAF3EF] text-[#1F5C4A] dark:bg-[#162B24] dark:text-[#34A887]"
                  : isNegative
                  ? "bg-[#FDF2F2] text-[#B94A4A] dark:bg-[#2C1A1A] dark:text-[#E06C6C]"
                  : "bg-[#EFEEE8] text-[#66717C] dark:bg-[#2A333D] dark:text-[#9CA3AF]"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : isNegative ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
              {formatPercentage(changePercentage)}
            </span>
            <span className="text-[#929A9F] text-[11px]">
              {periodLabel}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
