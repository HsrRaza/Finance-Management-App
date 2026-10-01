import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

const Text: React.FC = () => {
  return (
    <div className="flex flex-col items-center pt-12 pb-10 text-center max-w-4xl mx-auto px-4">
      {/* Editorial Tag Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EAF3EF] border border-[#C6E2D7] dark:bg-[#162B24] dark:border-[#234A3E] text-[#1F5C4A] dark:text-[#34A887] text-xs font-semibold tracking-wide mb-6">
        <span>Personal Finance Journal</span>
      </div>

      {/* Main Title */}
      <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-[#17212B] dark:text-[#F3F4F6]">
        Magically simplify your{" "}
        <span className="italic text-[#1F5C4A] dark:text-[#34A887]">
          personal finances
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-base sm:text-xl text-[#66717C] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-normal">
        Track daily expenses, record income streams, and analyze cash flow with a calm, editorial personal finance application.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
        <Link
          to="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1F5C4A] hover:bg-[#17483A] text-white font-bold text-base px-6 py-3 rounded-lg shadow-xs transition-colors"
        >
          <span>Open Finance Journal</span>
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
        <Link
          to="/login"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-[#1F262E] text-[#17212B] dark:text-[#F3F4F6] border border-[#E2E0D8] dark:border-[#2E3742] hover:bg-[#F7F5EF] dark:hover:bg-[#2A333D] font-semibold text-base px-6 py-3 rounded-lg transition-colors"
        >
          <span>Sign In to Account</span>
        </Link>
      </div>

      {/* Micro Feature Highlights */}
      <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-xs font-semibold text-[#66717C] dark:text-[#9CA3AF] pt-4 border-t border-[#E2E0D8] dark:border-[#2E3742] w-full max-w-2xl">
        <div className="flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-[#B86B4B]" />
          <span>Setup in 2 mins</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#1F5C4A]" />
          <span>Private Account Isolation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-[#1F5C4A]" />
          <span>Minimal Cash Flow Charts</span>
        </div>
      </div>
    </div>
  );
};

export default Text;