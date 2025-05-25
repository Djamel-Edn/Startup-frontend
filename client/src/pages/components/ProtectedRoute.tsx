import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading, isRoleAllowed } = useAuthContext();
  
  if (loading) {
    return <div>Loading authentication…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !isRoleAllowed(allowedRoles)) {
    return <Navigate to="/progress" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;