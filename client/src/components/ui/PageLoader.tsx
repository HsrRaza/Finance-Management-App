import React from "react";
import { Skeleton } from "./Skeleton";

export const PageLoader: React.FC = () => (
  <div className="p-6 space-y-4 w-full">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
    <Skeleton className="h-64 w-full" />
  </div>
);

export default PageLoader;
