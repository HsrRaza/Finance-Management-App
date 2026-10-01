import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17212B]/40 dark:bg-black/60 transition-opacity">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative w-full max-w-lg rounded-xl bg-white dark:bg-[#1F262E] border border-[#E2E0D8] dark:border-[#2E3742] p-6 shadow-lg z-10 text-[#17212B] dark:text-[#F3F4F6]",
          className
        )}
      >
        <div className="flex items-start justify-between mb-4 pb-3 border-b border-[#E2E0D8] dark:border-[#2E3742]">
          <div>
            {title && (
              <h2 className="text-lg font-bold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-[#66717C] dark:text-[#9CA3AF] mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-[#929A9F] hover:text-[#17212B] dark:hover:text-[#F3F4F6] hover:bg-[#EFEEE8] dark:hover:bg-[#2A333D] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
