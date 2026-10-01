import React from "react";
import { formatCurrency, formatDate } from "../../lib/utils";

interface TooltipPayloadItem {
  name: string;
  value: number;
  color?: string;
  fill?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white dark:bg-[#1F262E] border border-[#E2E0D8] dark:border-[#2E3742] p-3 shadow-md text-xs space-y-1.5 text-[#17212B] dark:text-[#F3F4F6]">
        {label && (
          <p className="font-bold text-[#17212B] dark:text-[#F3F4F6] border-b border-[#E2E0D8] dark:border-[#2E3742] pb-1">
            {formatDate(label)}
          </p>
        )}
        {payload.map((entry: TooltipPayloadItem, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span className="capitalize text-[#66717C] dark:text-[#9CA3AF]">
                {entry.name}:
              </span>
            </div>
            <span className="font-bold text-[#17212B] dark:text-[#F3F4F6]">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
