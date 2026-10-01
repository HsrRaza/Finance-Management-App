import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { Toaster } from "sonner";

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
};
