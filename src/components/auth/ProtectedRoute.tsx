
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

// Development mode flag - set to true to bypass authentication
const DEVELOPMENT_MODE = true;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  // In development mode, allow access without authentication
  if (DEVELOPMENT_MODE) {
    return <>{children}</>;
  }

  // Regular authentication check for production
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-unicorn-darkPurple/90">
        <div className="h-16 w-16 border-t-4 border-unicorn-gold border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
