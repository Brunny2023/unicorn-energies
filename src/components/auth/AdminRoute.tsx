
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRouteProps {
  children: ReactNode;
  isAdmin?: boolean; // Optional isAdmin prop for explicit admin-only routes
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading, isAdmin: userIsAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !userIsAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
