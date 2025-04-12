
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils/formatUtils";

interface InvestmentStats {
  total_invested: number;
  total_expected_return: number;
}

interface PortfolioSummaryProps {
  loading: boolean;
  investmentStats: InvestmentStats;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ 
  loading = false, 
  investmentStats = { total_invested: 0, total_expected_return: 0 }
}) => {
  // Ensure we have default values to prevent runtime errors
  const stats = investmentStats || { total_invested: 0, total_expected_return: 0 };
  
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-gray-300">Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-unicorn-darkPurple/50 rounded"></div>
            <div className="h-8 bg-unicorn-darkPurple/50 rounded"></div>
            <div className="h-8 bg-unicorn-darkPurple/50 rounded"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Invested</span>
              <span className="text-white font-medium">{formatCurrency(stats.total_invested)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expected Returns</span>
              <span className="text-green-400 font-medium">{formatCurrency(stats.total_expected_return)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Profit</span>
              <span className="text-unicorn-gold font-medium">
                {formatCurrency(stats.total_expected_return - stats.total_invested)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ROI</span>
              <span className="text-unicorn-gold font-medium">
                {stats.total_invested > 0 
                  ? `${((stats.total_expected_return / stats.total_invested - 1) * 100).toFixed(2)}%` 
                  : "0.00%"
                }
              </span>
            </div>
            
            <div className="pt-4 mt-4 border-t border-unicorn-gold/30">
              <Button asChild className="w-full text-unicorn-black bg-unicorn-gold hover:bg-unicorn-darkGold">
                <Link to="/calculator">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Investment Calculator
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
