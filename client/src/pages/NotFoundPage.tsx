import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F7F5EF] dark:bg-[#12161A] text-[#17212B] dark:text-[#F3F4F6]">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#EAF3EF] text-[#1F5C4A] dark:bg-[#162B24] dark:text-[#34A887] border border-[#C6E2D7] dark:border-[#234A3E] mb-6">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="font-serif-editorial text-4xl font-extrabold tracking-tight sm:text-5xl mb-2 text-[#17212B] dark:text-[#F3F4F6]">
        404
      </h1>
      <h2 className="text-xl font-bold mb-2">Record Not Found</h2>
      <p className="text-sm text-[#66717C] dark:text-[#9CA3AF] max-w-md text-center mb-8 leading-relaxed">
        The requested page or statement does not exist or has been relocated.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1F5C4A] hover:bg-[#17483A] text-white font-semibold text-sm transition-colors shadow-xs"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Overview
      </Link>
    </div>
  );
};

export default NotFoundPage;
