
import React from "react";
import DashboardOverview from "./DashboardOverview";
import DashboardTopNav from "../layout/DashboardTopNav";

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to your investment dashboard</p>
      </div>
      
      {/* Dashboard navigation tabs */}
      <DashboardTopNav />
      
      <DashboardOverview />
    </div>
  );
};

export default DashboardContent;
