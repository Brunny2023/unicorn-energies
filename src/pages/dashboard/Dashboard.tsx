
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/overview/DashboardContent";

const Dashboard = () => {
  console.log("Dashboard page component loaded"); 
  
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
