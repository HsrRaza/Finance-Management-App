import { createBrowserRouter, Navigate } from "react-router-dom";
// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";
import DashboardHome from "./pages/DashboardHome";
import IncomePage from "./pages/IncomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> } ,
      { path: "register", element: <RegisterPage /> } ,
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "income", element: <IncomePage /> },
    //   { path: "settings", element: <SettingsPage /> },
    ],
  },
  // Redirect 404s to home
  { path: "*", element: <Navigate to="/" /> }
]);

export default router;