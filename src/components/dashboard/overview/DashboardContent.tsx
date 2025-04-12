
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import DashboardOverview from "./DashboardOverview";
import PortfolioSummary from "./PortfolioSummary";
import TransactionsPanel from "./TransactionsPanel";
import StatsCardsList from "./StatsCardsList";
import RecentActivities from "./RecentActivities";

const DashboardContent = () => {
  const [loading, setLoading] = useState(true);
  
  // Default investment stats to avoid runtime errors
  const [investmentStats, setInvestmentStats] = useState({
    total_invested: 0,
    total_expected_return: 0
  });
  
  // Default transactions to avoid runtime errors
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      type: "deposit",
      amount: 1000,
      status: "completed",
      created_at: new Date().toISOString(),
      description: "Initial deposit"
    }
  ]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Simulate fetching investment stats
      setInvestmentStats({
        total_invested: 5000,
        total_expected_return: 6250
      });
      
      // Simulate fetching transactions
      setTransactions([
        {
          id: "1",
          type: "deposit",
          amount: 3000,
          status: "completed",
          created_at: new Date().toISOString(),
          description: "Initial deposit"
        },
        {
          id: "2",
          type: "investment",
          amount: 2000,
          status: "completed",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          description: "Dolphin plan investment"
        },
        {
          id: "3",
          type: "withdrawal",
          amount: 500,
          status: "pending",
          created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
          description: "Withdrawal request"
        }
      ]);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <DashboardOverview />
      
      <StatsCardsList loading={loading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-white">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioSummary loading={loading} investmentStats={investmentStats} />
          </CardContent>
        </Card>
        
        <RecentActivities loading={loading} />
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all" className="mt-0">
          <TransactionsPanel loading={loading} transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContent;
