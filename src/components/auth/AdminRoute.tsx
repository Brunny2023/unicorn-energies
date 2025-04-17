
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

// Development mode flag - enables bypassing authentication for testing
const DEVELOPMENT_MODE = true;

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  // In development mode, always render content
  if (DEVELOPMENT_MODE) {
    console.log("AdminRoute: Development mode enabled, bypassing auth check");
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-unicorn-darkPurple/90">
        <div className="h-16 w-16 border-t-4 border-unicorn-gold border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not logged in or not admin, redirect to login
  if (!user || !isAdmin) {
    console.log("AdminRoute: Access denied, redirecting to login");
    return <Navigate to="/admin-login" />;
  }

  // User is authenticated and is an admin
  return <>{children}</>;
};

export default AdminRoute;
