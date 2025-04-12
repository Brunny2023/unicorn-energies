
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/overview/DashboardContent";
import { setupConsoleFilters } from "@/utils/consoleErrorFilter";
import { useDashboardInitialization } from "@/hooks/dashboard/useDashboardInitialization";

const Dashboard = () => {
  // Use the custom hook for initialization logic
  useDashboardInitialization();
  
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
