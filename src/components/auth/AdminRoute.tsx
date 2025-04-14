
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

// Development mode flag - set to false for production
const DEVELOPMENT_MODE = false;

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  // In development mode, allow access without authentication
  if (DEVELOPMENT_MODE) {
    return <>{children}</>;
  }

  // Regular authentication and admin check for production
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-unicorn-darkPurple/90">
        <div className="h-16 w-16 border-t-4 border-unicorn-gold border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return user && isAdmin ? <>{children}</> : null;
};

export default AdminRoute;
