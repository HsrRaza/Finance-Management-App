import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, TrendingUp, TrendingDown, Receipt } from "lucide-react";
import { cn } from "../../lib/utils";

const MOBILE_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Income", path: "/dashboard/income", icon: TrendingUp },
  { name: "Expenses", path: "/dashboard/expenses", icon: TrendingDown },
  { name: "Transactions", path: "/dashboard/transactions", icon: Receipt },
];

export const MobileNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[#E2E0D8] dark:border-[#2E3742] bg-white/95 dark:bg-[#1F262E]/95 backdrop-blur-md lg:hidden px-2">
      {MOBILE_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.path === "/dashboard"
            ? location.pathname === "/dashboard"
            : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-lg transition-colors",
              isActive
                ? "text-[#1F5C4A] dark:text-[#34A887] font-bold"
                : "text-[#66717C] dark:text-[#9CA3AF] hover:text-[#17212B] dark:hover:text-[#F3F4F6]"
            )}
          >
            <Icon className="h-4.5 w-4.5" />
            <span className="text-[10px] font-semibold">{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
