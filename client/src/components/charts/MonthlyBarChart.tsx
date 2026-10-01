import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { CustomTooltip } from "./CustomTooltip";
import type { ChartDataPoint } from "../../types/dashboard";

interface MonthlyBarChartProps {
  data: ChartDataPoint[];
  isLoading?: boolean;
  title?: string;
}

export const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({
  data = [],
  isLoading = false,
  title = "Monthly Comparison",
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Skeleton className="h-full w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const isEmpty = !data || data.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="h-[280px] flex items-center justify-center">
            <EmptyState
              title="No comparison data"
              description="Monthly bar chart will render as transaction records accumulate."
            />
          </div>
        ) : (
          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#E2E0D8" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#929A9F" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#929A9F" }}
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: "10px", fontSize: "12px", color: "#66717C" }}
                  iconType="square"
                />
                <Bar dataKey="income" name="Income" fill="#1F5C4A" radius={[4, 4, 0, 0]} maxBarSize={24} />
                <Bar dataKey="expense" name="Expense" fill="#B94A4A" radius={[4, 4, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
