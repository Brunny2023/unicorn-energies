
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, CircleDollarSign } from "lucide-react";

interface StatsCardsProps {
  loading: boolean;
  activeCount: number;
  totalInvested: number;
  totalReturns: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  loading,
  activeCount,
  totalInvested,
  totalReturns,
}) => {
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate ROI percentage
  const calculateRoi = (): string => {
    if (totalInvested === 0) return "0%";
    const roi = ((totalReturns - totalInvested) / totalInvested) * 100;
    return `${roi.toFixed(2)}%`;
  };

  // If loading, show skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-10 bg-unicorn-gold/20 rounded-full w-10 mb-4"></div>
                <div className="h-6 bg-unicorn-gold/20 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-unicorn-gold/10 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="rounded-full bg-unicorn-gold/10 p-2 w-10 h-10 flex items-center justify-center mb-3">
                <TrendingUp className="h-5 w-5 text-unicorn-gold" />
              </div>
              <div className="text-2xl font-bold text-white">{activeCount}</div>
              <div className="text-sm text-gray-400">Active Investments</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="rounded-full bg-unicorn-gold/10 p-2 w-10 h-10 flex items-center justify-center mb-3">
                <CircleDollarSign className="h-5 w-5 text-unicorn-gold" />
              </div>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalInvested)}</div>
              <div className="text-sm text-gray-400">Total Invested</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="rounded-full bg-unicorn-gold/10 p-2 w-10 h-10 flex items-center justify-center mb-3">
                <ArrowUpRight className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalReturns)}</div>
              <div className="text-sm text-gray-400">Expected Returns <span className="text-green-500 ml-1">({calculateRoi()})</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
