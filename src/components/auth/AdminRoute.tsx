
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

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
