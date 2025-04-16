
import React, { useEffect } from "react";
import DashboardContent from "@/components/dashboard/overview/DashboardContent";
import { setupConsoleFilters } from "@/utils/consoleErrorFilter";
import { useDashboardInitialization } from "@/hooks/dashboard/useDashboardInitialization";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  
  // Set up console filters to reduce noise
  useEffect(() => {
    setupConsoleFilters();
    console.log("Dashboard page loaded", { 
      user: user?.id, 
      isAdmin, 
      loading,
      timestamp: new Date().toISOString()
    });
  }, [user, isAdmin, loading]);
  
  // Use the custom hook for initialization logic
  useDashboardInitialization();
  
  return (
    <div className="w-full">
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
