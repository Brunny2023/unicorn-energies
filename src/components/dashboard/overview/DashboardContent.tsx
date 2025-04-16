
import React from "react";
import DashboardOverview from "./DashboardOverview";
import DashboardTopNav from "../layout/DashboardTopNav";
import OilTradingChart from "./OilTradingChart"; // Import the OilTradingChart component
import StatCards from "./StatCards";
import RecentActivities from "./RecentActivities";
import PortfolioSummary from "./PortfolioSummary";
import TransactionsPanel from "./TransactionsPanel";

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to your investment dashboard</p>
      </div>
      
      {/* Dashboard navigation tabs */}
      <DashboardTopNav />
      
      {/* Stats and overview cards */}
      <StatCards />
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioSummary />
        <OilTradingChart /> {/* Added oil trading chart */}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionsPanel />
        <RecentActivities />
      </div>
      
      <DashboardOverview />
    </div>
  );
};

export default DashboardContent;
