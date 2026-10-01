import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, accessToken } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated && !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
