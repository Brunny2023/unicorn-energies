
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, ArrowUp, Wallet, Users, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
  loading?: boolean;
}

const StatCard = ({ title, value, icon, change, trend, loading = false }: StatCardProps) => {
  return (
    <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30 hover:border-unicorn-gold/50 transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-24 mt-1 bg-unicorn-purple/40" />
            ) : (
              <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
            )}
          </div>
          <div className="p-3 rounded-full bg-unicorn-gold/10">
            {icon}
          </div>
        </div>
        
        {change && !loading && (
          <div className="mt-3 flex items-center">
            {trend === "up" && <ArrowUp className="h-4 w-4 text-green-500 mr-1" />}
            {trend === "down" && <ArrowDown className="h-4 w-4 text-red-500 mr-1" />}
            <span className={`text-xs ${
              trend === "up" ? "text-green-500" : 
              trend === "down" ? "text-red-500" : 
              "text-gray-400"
            }`}>
              {change}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const StatsCardsList = ({ loading = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Portfolio Value"
        value={loading ? "" : "$15,280.00"}
        icon={<LineChart className="h-6 w-6 text-unicorn-gold" />}
        change={loading ? "" : "+12% from last month"}
        trend="up"
        loading={loading}
      />
      
      <StatCard
        title="Available Balance"
        value={loading ? "" : "$8,650.50"}
        icon={<Wallet className="h-6 w-6 text-unicorn-gold" />}
        change={loading ? "" : "Ready to withdraw"}
        trend="neutral"
        loading={loading}
      />
      
      <StatCard
        title="Active Investments"
        value={loading ? "" : "3"}
        icon={<Users className="h-6 w-6 text-unicorn-gold" />}
        change={loading ? "" : "Performing well"}
        trend="up"
        loading={loading}
      />
    </div>
  );
};

export default StatsCardsList;
