import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";
import { useUIStore } from "../../store/uiStore";
import { cn } from "../../lib/utils";

export const AppLayout: React.FC = () => {
  const { sidebarCollapsed, theme } = useUIStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#F7F5EF] dark:bg-[#12161A] text-[#17212B] dark:text-[#F3F4F6] flex transition-colors duration-150">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out pb-16 lg:pb-0",
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <Topbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />
    </div>
  );
};

export default AppLayout;
