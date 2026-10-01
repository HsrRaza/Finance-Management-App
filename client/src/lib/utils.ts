import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return "Invalid date";
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat("en-US", defaultOptions).format(date);
}

export function formatPercentage(value: number): string {
  const formatted = value.toFixed(1);
  return value > 0 ? `+${formatted}%` : `${formatted}%`;
}
