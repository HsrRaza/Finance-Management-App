import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Sun, Moon, Search } from "lucide-react";
import { useUIStore } from "../../store/uiStore";
import { useAuth } from "../../features/auth/hooks/useAuth";

const getPageTitle = (pathname: string): string => {
  if (pathname === "/dashboard") return "Overview & Cash Flow";
  if (pathname.includes("/income")) return "Income Register";
  if (pathname.includes("/expenses")) return "Expense Register";
  if (pathname.includes("/transactions")) return "Transaction History";
  if (pathname.includes("/settings")) return "Account Settings";
  return "Personal Finance Journal";
};

export const Topbar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { theme, toggleTheme, toggleMobileSidebar } = useUIStore();

  const title = getPageTitle(location.pathname);
  const userName = user?.name || "User";
  const avatarUrl =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1F5C4A&color=fff`;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E2E0D8] dark:border-[#2E3742] bg-[#F7F5EF]/90 dark:bg-[#12161A]/90 backdrop-blur-md px-4 lg:px-8">
      {/* Left section: Hamburger for Mobile + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="flex lg:hidden p-1.5 rounded-md text-[#66717C] dark:text-[#9CA3AF] hover:bg-[#EFEEE8] dark:hover:bg-[#2A333D] transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-base sm:text-lg font-extrabold text-[#17212B] dark:text-[#F3F4F6] tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right section: Search, Theme Toggle, Avatar */}
      <div className="flex items-center gap-3">
        {/* Search Bar Input (Desktop) */}
        <div className="relative hidden md:flex items-center w-64">
          <Search className="absolute left-3 h-3.5 w-3.5 text-[#929A9F]" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full h-8.5 rounded-lg border border-[#E2E0D8] dark:border-[#2E3742] bg-white dark:bg-[#1F262E] pl-9 pr-3 text-xs text-[#17212B] dark:text-[#F3F4F6] placeholder:text-[#929A9F] focus:outline-none focus:ring-1 focus:ring-[#1F5C4A]"
          />
        </div>

        {/* Theme Toggle Switch */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md text-[#66717C] hover:text-[#17212B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6] hover:bg-[#EFEEE8] dark:hover:bg-[#2A333D] transition-colors"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="h-4.5 w-4.5 text-[#E5A14B]" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-[#66717C]" />
          )}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E2E0D8] dark:border-[#2E3742]">
          <img
            src={avatarUrl}
            alt={userName}
            className="h-7.5 w-7.5 rounded-full border border-[#E2E0D8] dark:border-[#2E3742] object-cover"
          />
          <span className="hidden sm:block text-xs font-bold text-[#17212B] dark:text-[#F3F4F6]">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
};
