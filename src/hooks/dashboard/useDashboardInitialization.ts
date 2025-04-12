
import { useEffect } from "react";
import { setupConsoleFilters } from "@/utils/consoleErrorFilter";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Custom hook to handle dashboard initialization logic
 */
export const useDashboardInitialization = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Set up console filters to reduce noise from browser extensions
    setupConsoleFilters();
    
    // Log dashboard initialization
    console.log("Dashboard initialized", { 
      userAuthenticated: !!user,
      userId: user?.id || 'not-authenticated' 
    });
  }, [user]);

  return {
    isAuthenticated: !!user
  };
};
