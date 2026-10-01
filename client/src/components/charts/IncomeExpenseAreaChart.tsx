import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { CustomTooltip } from "./CustomTooltip";
import type { ChartDataPoint } from "../../types/dashboard";

interface IncomeExpenseAreaChartProps {
  data: ChartDataPoint[];
  isLoading?: boolean;
  title?: string;
  period?: string;
  onPeriodChange?: (period: string) => void;
}

export const IncomeExpenseAreaChart: React.FC<IncomeExpenseAreaChartProps> = ({
  data = [],
  isLoading = false,
  title = "Cash Flow Trends",
  period,
  onPeriodChange,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px] flex items-center justify-center">
          <Skeleton className="h-full w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const isEmpty = !data || data.length === 0;

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <CardTitle>{title}</CardTitle>
        {onPeriodChange && period && (
          <div className="flex rounded-md bg-[#EFEEE8] dark:bg-[#2A333D] p-0.5 border border-[#E2E0D8] dark:border-[#2E3742] self-start sm:self-auto">
            {["7d", "30d", "60d", "12m"].map((p) => (
              <button
                key={p}
                onClick={() => onPeriodChange(p)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  period === p
                    ? "bg-white dark:bg-[#1F262E] text-[#17212B] dark:text-[#F3F4F6] shadow-2xs"
                    : "text-[#66717C] hover:text-[#17212B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]"
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent>
        {isEmpty ? (
          <div className="h-[300px] flex items-center justify-center">
            <EmptyState
              title="No cash flow data available"
              description="Add income or expense transactions to view cash flow over time."
            />
          </div>
        ) : (
          <div className="h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#E2E0D8" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#929A9F" }}
                  tickFormatter={(str) => {
                    const date = new Date(str);
                    return isNaN(date.getTime()) ? str : `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#929A9F" }}
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#1F5C4A"
                  strokeWidth={2}
                  fillOpacity={0.08}
                  fill="#1F5C4A"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  name="Expense"
                  stroke="#B94A4A"
                  strokeWidth={2}
                  fillOpacity={0.08}
                  fill="#B94A4A"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
