import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wallet, ArrowRight } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-150 ${
        isScrolled
          ? "bg-[#F7F5EF]/95 dark:bg-[#12161A]/95 border-b border-[#E2E0D8] dark:border-[#2E3742]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F5C4A] text-white">
              <Wallet className="h-4.5 w-4.5" />
            </div>
            <span className="font-serif-editorial text-xl font-bold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
              FinanceTracker
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="text-xs font-semibold text-[#66717C] dark:text-[#9CA3AF] hover:text-[#17212B] dark:hover:text-[#F3F4F6] px-3 py-2 rounded-md transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-[#1F5C4A] hover:bg-[#17483A] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;