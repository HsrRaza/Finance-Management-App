import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import { Wallet } from "lucide-react";

const PublicLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-[#F7F5EF] dark:bg-[#12161A] text-[#17212B] dark:text-[#F3F4F6] transition-colors duration-150">
    <Navbar />

    <main className="grow">
      <Outlet />
    </main>

    <footer className="border-t border-[#E2E0D8] dark:border-[#2E3742] bg-white dark:bg-[#1F262E] py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#66717C] dark:text-[#9CA3AF]">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1F5C4A] text-white">
            <Wallet className="h-3.5 w-3.5" />
          </div>
          <span className="font-serif-editorial font-bold text-[#17212B] dark:text-[#F3F4F6] text-sm">
            FinanceTracker
          </span>
        </div>

        <div className="flex items-center gap-5 font-semibold">
          <Link to="/dashboard" className="hover:text-[#1F5C4A] transition-colors">
            Overview
          </Link>
          <Link to="/login" className="hover:text-[#1F5C4A] transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="hover:text-[#1F5C4A] transition-colors">
            Register
          </Link>
        </div>

        <div>
          &copy; {new Date().getFullYear()} FinanceTracker. Personal Finance Journal.
        </div>
      </div>
    </footer>
  </div>
);

export default PublicLayout;