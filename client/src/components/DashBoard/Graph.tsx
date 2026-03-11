
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
} from "recharts";
import { useIncomeQuery } from "../../hooks/useIncomeQuery";







export const Graph = () => {

  const {data:incomes = [] , isLoading} = useIncomeQuery()

  const chartData = useMemo(()=>{
     const grouped:Record<string, number> ={}


     incomes.forEach((txn:any)=>{
        const day = new Date(txn.createdAt).toLocaleDateString("en-US",{
          weekday:"short"
        })

        if(!grouped[day]){
          grouped[day] = 0
        }
        grouped[day] += Number(txn.amount)
     })

     return Object.entries(grouped).map(([day, amount])=>({
      name:day,
      New:amount
     }))
  },[incomes])

  if(isLoading) return <p>Loading...</p>
  
  return (
    <div className="col-span-8 overflow-hidden  border border-stone-300 rounded-xl bg-white/90">
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
              dataKey="New"
              stroke="#18181b"
              fill="#18181b"
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#5b21b6"
              fill="#5b21b6"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};