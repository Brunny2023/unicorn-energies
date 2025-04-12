
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/overview/DashboardContent";
import { setupConsoleFilters } from "@/utils/consoleErrorFilter";

const Dashboard = () => {
  React.useEffect(() => {
    // Set up console filters to reduce noise from browser extensions
    setupConsoleFilters();
    console.log("Dashboard page component loaded");
  }, []);
  
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
