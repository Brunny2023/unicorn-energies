
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

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
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
            <PortfolioSummary loading={loading} />
          </CardContent>
        </Card>
        
        <RecentActivities loading={loading} />
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all" className="mt-0">
          <TransactionsPanel loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContent;
