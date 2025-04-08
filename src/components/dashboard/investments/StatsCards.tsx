
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, ArrowUpRight, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  loading: boolean;
  activeCount: number;
  totalInvested: number;
  totalReturns: number;
}

// Local formatter to avoid dependency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

const StatsCards = ({ loading, activeCount, totalInvested, totalReturns }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-300">Active Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <LineChart className="mr-2 h-5 w-5 text-unicorn-gold" />
            {loading ? (
              <div className="animate-pulse">
                <div className="h-9 w-20 bg-gray-700/50 rounded"></div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-white">{activeCount}</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-300">Total Invested</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowUpRight className="mr-2 h-5 w-5 text-unicorn-gold" />
            {loading ? (
              <div className="animate-pulse">
                <div className="h-9 w-32 bg-gray-700/50 rounded"></div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-white">
                {formatCurrency(totalInvested)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-300">Expected Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-unicorn-gold" />
            {loading ? (
              <div className="animate-pulse">
                <div className="h-9 w-32 bg-gray-700/50 rounded"></div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-white">
                {formatCurrency(totalReturns)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
