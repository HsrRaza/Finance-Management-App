import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "income" | "expense" | "outline" | "secondary";
}

export const Badge = ({
  className,
  variant = "default",
  ...props
}: BadgeProps) => {
  const variants = {
    default: "bg-[#EFEEE8] text-[#17212B] dark:bg-[#2A333D] dark:text-[#F3F4F6] border-[#E2E0D8] dark:border-[#2E3742]",
    income: "bg-[#EAF3EF] text-[#1F5C4A] dark:bg-[#162B24] dark:text-[#34A887] border-[#C6E2D7] dark:border-[#234A3E]",
    expense: "bg-[#FDF2F2] text-[#B94A4A] dark:bg-[#2C1A1A] dark:text-[#E06C6C] border-[#F4D4D4] dark:border-[#4A2424]",
    outline: "border-[#E2E0D8] dark:border-[#2E3742] text-[#66717C] dark:text-[#9CA3AF]",
    secondary: "bg-[#EFEEE8] text-[#66717C] dark:bg-[#2A333D] dark:text-[#9CA3AF] border-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold tracking-tight transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
