import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface SparklineChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  color = "#6366f1",
  height = 36,
}) => {
  if (!data || data.length === 0) return null;

  const chartData = data.map((val, idx) => ({ idx, val }));

  return (
    <div style={{ height }} className="w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="val"
            stroke={color}
            strokeWidth={1.5}
            fillOpacity={1}
            fill={`url(#spark-${color})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
