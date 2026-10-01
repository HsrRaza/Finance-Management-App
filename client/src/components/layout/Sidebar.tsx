import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Receipt,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Wallet,
} from "lucide-react";
import { useUIStore } from "../../store/uiStore";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Income",
    path: "/dashboard/income",
    icon: TrendingUp,
  },
  {
    name: "Expenses",
    path: "/dashboard/expenses",
    icon: TrendingDown,
  },
  {
    name: "Transactions",
    path: "/dashboard/transactions",
    icon: Receipt,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const {
    sidebarCollapsed,
    isMobileSidebarOpen,
    toggleSidebar,
    setMobileSidebarOpen,
  } = useUIStore();

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname, setMobileSidebarOpen]);

  const userName = user?.name || "User Account";
  const userEmail = user?.email || "user@financetracker.com";
  const avatarUrl =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1F5C4A&color=fff&bold=true`;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#17212B]/40 dark:bg-black/60 lg:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white dark:bg-[#1F262E] border-r border-[#E2E0D8] dark:border-[#2E3742] transition-all duration-200 ease-in-out",
          sidebarCollapsed ? "lg:w-20" : "lg:w-64",
          isMobileSidebarOpen
            ? "translate-x-0 w-64 shadow-lg"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-[#E2E0D8] dark:border-[#2E3742]">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2.5 font-bold text-base tracking-tight text-[#17212B] dark:text-[#F3F4F6]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1F5C4A] text-white">
              <Wallet className="h-4.5 w-4.5" />
            </div>
            {(!sidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate font-bold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
                FinanceTracker
              </span>
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-[#929A9F] hover:text-[#17212B] dark:hover:text-[#F3F4F6] hover:bg-[#EFEEE8] dark:hover:bg-[#2A333D] transition-colors"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          {/* Mobile Close Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="flex lg:hidden h-7 w-7 items-center justify-center rounded-md text-[#929A9F] hover:text-[#17212B] dark:hover:text-[#F3F4F6] hover:bg-[#EFEEE8] dark:hover:bg-[#2A333D]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
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
                  "flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors group relative",
                  isActive
                    ? "bg-[#EAF3EF] dark:bg-[#162B24] text-[#1F5C4A] dark:text-[#34A887] font-semibold"
                    : "text-[#66717C] dark:text-[#9CA3AF] hover:bg-[#EFEEE8] dark:hover:bg-[#2A333D] hover:text-[#17212B] dark:hover:text-[#F3F4F6]"
                )}
                title={sidebarCollapsed ? item.name : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#1F5C4A] dark:bg-[#34A887] rounded-r-md" />
                )}
                <Icon
                  className={cn(
                    "h-4.5 w-4.5 shrink-0 transition-colors",
                    isActive
                      ? "text-[#1F5C4A] dark:text-[#34A887]"
                      : "text-[#929A9F] group-hover:text-[#17212B] dark:group-hover:text-[#F3F4F6]"
                  )}
                />
                {(!sidebarCollapsed || isMobileSidebarOpen) && (
                  <span className="truncate text-xs font-semibold">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-[#E2E0D8] dark:border-[#2E3742]">
          <div
            className={cn(
              "flex items-center gap-2.5 p-2 rounded-lg bg-[#EFEEE8]/60 dark:bg-[#2A333D]/50 border border-[#E2E0D8] dark:border-[#2E3742]",
              sidebarCollapsed && !isMobileSidebarOpen && "justify-center p-1.5"
            )}
          >
            <img
              src={avatarUrl}
              alt={userName}
              className="h-8 w-8 rounded-full object-cover border border-[#E2E0D8] dark:border-[#2E3742] shrink-0"
            />
            {(!sidebarCollapsed || isMobileSidebarOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#17212B] dark:text-[#F3F4F6] truncate">
                  {userName}
                </p>
                <p className="text-[11px] text-[#929A9F] truncate">
                  {userEmail}
                </p>
              </div>
            )}
            {(!sidebarCollapsed || isMobileSidebarOpen) && (
              <button
                onClick={logout}
                className="p-1.5 text-[#929A9F] hover:text-[#B94A4A] dark:hover:text-[#E06C6C] hover:bg-[#FDF2F2] dark:hover:bg-[#2C1A1A] rounded-md transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
