
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Development mode flag - set to true for debugging purposes
const DEVELOPMENT_MODE = true;

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    console.log("AdminRoute: User state", { user, isAdmin, loading });
    if (DEVELOPMENT_MODE) {
      console.log("AdminRoute: Development mode enabled, showing content");
      setShowContent(true);
      return;
    }

    if (!loading) {
      setShowContent(user && isAdmin);
    }
  }, [user, isAdmin, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-unicorn-darkPurple/90">
        <div className="h-16 w-16 border-t-4 border-unicorn-gold border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return showContent ? <>{children}</> : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-unicorn-darkPurple/90">
      <h1 className="text-2xl text-white mb-4">Access Denied</h1>
      <p className="text-gray-300">You do not have permission to view this page.</p>
    </div>
  );
};

export default AdminRoute;
