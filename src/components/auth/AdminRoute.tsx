
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRouteProps {
  children: ReactNode;
  isAdmin?: boolean; // Add optional isAdmin prop
}

const AdminRoute = ({ children, isAdmin }: AdminRouteProps) => {
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
