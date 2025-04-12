
import React from "react";
import StatCards from "./StatCards";
import TransactionsPanel from "./TransactionsPanel";
import PortfolioSummary from "./PortfolioSummary";
import RecentActivities from "./RecentActivities";
import OilTradingChart from "./OilTradingChart";

// Mock data for transactions
const mockTransactions = [
  {
    id: "tx_234567890",
    type: "deposit",
    amount: 10000,
    status: "completed",
    created_at: new Date(Date.now() - 2 * 3600000).toISOString()
  },
  {
    id: "tx_345678901",
    type: "investment",
    amount: 7500,
    status: "completed",
    created_at: new Date(Date.now() - 25 * 3600000).toISOString()
  },
  {
    id: "tx_456789012",
    type: "credit",
    amount: 125.50,
    status: "completed",
    created_at: new Date(Date.now() - 73 * 3600000).toISOString()
  }
];

const DashboardContent = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-6">
        <StatCards loading={isLoading} />
        
        {/* 2-column layout for wider screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioSummary loading={isLoading} />
          <OilTradingChart />
        </div>
        
        {/* Another 2-column layout for transactions and activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionsPanel 
            loading={isLoading} 
            transactions={mockTransactions} 
          />
          <RecentActivities loading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
