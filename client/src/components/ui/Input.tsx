import React, { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-[#17212B] dark:text-[#F3F4F6]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-[#929A9F] pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg border border-[#E2E0D8] dark:border-[#2E3742] bg-white dark:bg-[#1F262E] px-3.5 py-2 text-sm text-[#17212B] dark:text-[#F3F4F6] placeholder:text-[#929A9F] transition-colors focus:outline-none focus:ring-1 focus:ring-[#1F5C4A] focus:border-[#1F5C4A] disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              error && "border-[#B94A4A] focus:ring-[#B94A4A] focus:border-[#B94A4A]",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-[#B94A4A] font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
