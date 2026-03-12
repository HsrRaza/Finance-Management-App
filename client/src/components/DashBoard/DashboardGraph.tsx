
import { FiUser } from "react-icons/fi";
import { useMemo } from "react";


import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Line,
    LineChart,
    Legend,
} from "recharts";
import { useDashBoardQuery } from "../../hooks/useDashBoardQuery";
import { generateFinanceChartData } from "../../utils/DashboardChartData";









export const DashboardGraph = () => {

    const { data, isLoading } = useDashBoardQuery()

    const chartData = useMemo(() => {
        if (!data) return []

        return generateFinanceChartData(
            data.last60daysIncome.transaction,
            data.last30DaysExpense.transaction
        )
    }, [data])


    if (isLoading) return <p>Loading...</p>

    return (
        <div className="col-span-8 overflow-hidden  border border-stone-300 rounded-xl bg-white/90 mb-6">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiUser /> Activity
                </h3>
            </div>

            <div className="h-64 px-4">
                <ResponsiveContainer width="100%" height="100%">
                    
                    <LineChart
                        width={500}
                        height={400}
                        data={chartData}
                        margin={{
                            top: 0,
                            right: 0,
                            left: -24,
                            bottom: 0,
                        }}
                    
>
     <Legend/>
                        <CartesianGrid stroke="#e4e4e7" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            className="text-xs font-bold"
                            padding={{ right: 4 }}
                        />
                        <YAxis
                            className="text-xs font-bold"
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            wrapperClassName="text-sm rounded"
                            labelClassName="text-xs text-stone-500"
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={{ r: 2 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={{ r: 2 }}
                        />
                       
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};