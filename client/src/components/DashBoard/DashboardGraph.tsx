import { FiUser } from "react-icons/fi";
import { useMemo } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { useDashBoardQuery } from "../../hooks/useDashBoardQuery";
import { generateFinanceChartData } from "../../utils/DashboardChartData";


export const DashboardGraph = () => {

  const { data, isLoading } = useDashBoardQuery();

  const chartData = useMemo(() => {
    if (!data) return [];

    const res = generateFinanceChartData(
      data.last60daysIncome.transaction,
      data.last30DaysExpense.transaction
    );
    return res.reverse()
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="col-span-8 min-w-0 overflow-hidden border border-stone-300 rounded-xl bg-white/90">

      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Financial Activity
        </h3>
      </div>

      <div className="h-64 px-4">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>

            {/* Gradients */}
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#e4e4e7" strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-semibold"
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-xs font-semibold"
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e4e4e7",
              }}
            />

            <Legend />

            {/* Income */}
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              fill="url(#incomeGradient)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />

            {/* Expense */}
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              fill="url(#expenseGradient)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};