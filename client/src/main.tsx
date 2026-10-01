import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "./app/QueryProvider";
import router from "./app/router";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </ErrorBoundary>
);
