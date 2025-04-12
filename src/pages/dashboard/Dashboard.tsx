
import React, { useEffect } from "react";
import DashboardContent from "@/components/dashboard/overview/DashboardContent";
import { setupConsoleFilters } from "@/utils/consoleErrorFilter";
import { useDashboardInitialization } from "@/hooks/dashboard/useDashboardInitialization";

const Dashboard = () => {
  // Set up console filters to reduce noise
  useEffect(() => {
    setupConsoleFilters();
    console.log("Dashboard page loaded");
  }, []);
  
  // Use the custom hook for initialization logic
  useDashboardInitialization();
  
  return (
    <div className="w-full">
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
