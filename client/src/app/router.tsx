import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PageLoader from "../components/ui/PageLoader";

// Lazy-loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const DashboardHome = lazy(() => import("../pages/DashboardHome"));
const IncomePage = lazy(() => import("../pages/IncomePage"));
const ExpensePage = lazy(() => import("../pages/ExpensePage"));
const TransactionsPage = lazy(() => import("../pages/TransactionsPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <DashboardHome />
              </Suspense>
            ),
          },
          {
            path: "income",
            element: (
              <Suspense fallback={<PageLoader />}>
                <IncomePage />
              </Suspense>
            ),
          },
          {
            path: "expenses",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ExpensePage />
              </Suspense>
            ),
          },
          {
            path: "transactions",
            element: (
              <Suspense fallback={<PageLoader />}>
                <TransactionsPage />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<PageLoader />}>
                <SettingsPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "404",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default router;
