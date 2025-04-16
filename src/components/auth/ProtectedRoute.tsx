
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Development mode flag - set to true for local development
const DEVELOPMENT_MODE = true;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  // In development mode, allow access without authentication
  if (DEVELOPMENT_MODE) {
    return <>{children}</>;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-unicorn-darkPurple/90">
        <div className="h-16 w-16 border-t-4 border-unicorn-gold border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // User is authenticated, show the route
  return <>{children}</>;
};

export default ProtectedRoute;
