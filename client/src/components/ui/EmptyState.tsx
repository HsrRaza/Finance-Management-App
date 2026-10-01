import React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "../../lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There are no records to display at this time.",
  action,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-[#E2E0D8] dark:border-[#2E3742] bg-[#F7F5EF]/60 dark:bg-[#1B2128]/50",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EFEEE8] text-[#66717C] dark:bg-[#2A333D] dark:text-[#9CA3AF] mb-3 border border-[#E2E0D8] dark:border-[#2E3742]">
        {icon || <FolderOpen className="h-5 w-5" />}
      </div>
      <h3 className="text-sm font-bold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">{title}</h3>
      <p className="mt-1 text-xs text-[#66717C] dark:text-[#9CA3AF] max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
