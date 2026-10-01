import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { formatCurrency } from "../../lib/utils";
import type { CategorySummary } from "../../types/dashboard";

interface CategoryPieChartProps {
  data: CategorySummary[];
  isLoading?: boolean;
  title?: string;
}

// Sophisticated editorial color system
const EDITORIAL_PALETTE = [
  "#1F5C4A", // Forest green
  "#B86B4B", // Terracotta / Copper
  "#2C4D6F", // Slate navy
  "#C8832B", // Warm amber
  "#6B5B95", // Deep muted violet
  "#5B8C5A", // Muted sage
  "#8C534D", // Muted maroon
  "#4A6B6C", // Muted teal
];

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  data = [],
  isLoading = false,
  title = "Spending Breakdown",
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Skeleton className="h-44 w-44 rounded-full" />
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
              title="No spending categories"
              description="Log expenses with categories to analyze spending distribution."
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-[190px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="amount"
                    nameKey="category"
                  >
                    {data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={EDITORIAL_PALETTE[index % EDITORIAL_PALETTE.length]}
                        stroke="#FFFFFF"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => formatCurrency(Number(val || 0))}
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid #E2E0D8",
                      color: "#17212B",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Category Legend Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-[#E2E0D8] dark:border-[#2E3742]">
              {data.slice(0, 6).map((item, index) => {
                const color = EDITORIAL_PALETTE[index % EDITORIAL_PALETTE.length];

                return (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span
                        className="h-2.5 w-2.5 rounded-sm shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="truncate text-[#66717C] dark:text-[#9CA3AF] font-medium">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-[#17212B] dark:text-[#F3F4F6] ml-1">
                      {item.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
