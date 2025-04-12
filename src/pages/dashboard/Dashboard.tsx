
import React from "react";
import DashboardContent from "@/components/dashboard/overview/DashboardContent";
import { setupConsoleFilters } from "@/utils/consoleErrorFilter";
import { useDashboardInitialization } from "@/hooks/dashboard/useDashboardInitialization";

const Dashboard = () => {
  // Use the custom hook for initialization logic
  useDashboardInitialization();
  
  return <DashboardContent />;
};

export default Dashboard;
