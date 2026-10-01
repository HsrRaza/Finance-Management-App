import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99]";

    const variants = {
      primary:
        "bg-[#1F5C4A] hover:bg-[#17483A] text-white shadow-xs focus-visible:ring-[#1F5C4A] dark:bg-[#2A7B64] dark:hover:bg-[#339176]",
      secondary:
        "bg-white dark:bg-[#1F262E] text-[#17212B] dark:text-[#F3F4F6] border border-[#E2E0D8] dark:border-[#2E3742] hover:bg-[#F7F5EF] dark:hover:bg-[#2A333D] focus-visible:ring-[#1F5C4A]",
      outline:
        "border border-[#E2E0D8] dark:border-[#2E3742] bg-transparent hover:bg-[#EFEEE8] dark:hover:bg-[#2A333D] text-[#17212B] dark:text-[#F3F4F6] focus-visible:ring-[#1F5C4A]",
      ghost:
        "bg-transparent hover:bg-[#EFEEE8] dark:hover:bg-[#2A333D] text-[#17212B] dark:text-[#F3F4F6] focus-visible:ring-[#1F5C4A]",
      danger:
        "bg-[#B94A4A] hover:bg-[#9B3C3C] text-white shadow-xs focus-visible:ring-[#B94A4A]",
      success:
        "bg-[#1F5C4A] hover:bg-[#17483A] text-white shadow-xs focus-visible:ring-[#1F5C4A]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9.5 px-4 text-sm gap-2",
      lg: "h-11 px-5 text-base gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
