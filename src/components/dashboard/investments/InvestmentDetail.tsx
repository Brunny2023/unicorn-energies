
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types/investment";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvestmentDetailSummary from "./InvestmentDetailSummary";
import InvestmentDetailTimeline from "./InvestmentDetailTimeline";
import InvestmentDetailProgress from "./InvestmentDetailProgress";
import InvestmentDetailActions from "./InvestmentDetailActions";

interface InvestmentDetailProps {
  investment: Investment;
  onClose: () => void;
}

const InvestmentDetail: React.FC<InvestmentDetailProps> = ({ investment, onClose }) => {
  // Calculate days remaining
  const calculateDaysRemaining = (): number => {
    const endDate = new Date(investment.end_date);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Calculate days elapsed
  const calculateDaysElapsed = (): number => {
    const startDate = new Date(investment.start_date);
    const now = new Date();
    const diffTime = now.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Calculate progress percentage
  const calculateProgress = (): number => {
    const totalDays = investment.duration;
    const daysElapsed = calculateDaysElapsed();
    return Math.min((daysElapsed / totalDays) * 100, 100);
  };

  // Calculate daily profit
  const calculateDailyProfit = (): number => {
    return (Number(investment.amount) * Number(investment.daily_return)) / 100;
  };

  // Calculate total earned so far
  const calculateEarnedSoFar = (): number => {
    return calculateDailyProfit() * calculateDaysElapsed();
  };

  const daysRemaining = calculateDaysRemaining();
  const progress = calculateProgress();
  const dailyProfit = calculateDailyProfit();
  const earnedSoFar = calculateEarnedSoFar();

  return (
    <Card className="bg-unicorn-darkPurple/95 border-unicorn-gold/30 text-white shadow-xl">
      <CardHeader className="border-b border-unicorn-gold/20 pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-unicorn-gold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            {investment.plan_id} Investment Details
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-unicorn-purple/20"
          >
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <InvestmentDetailSummary 
              amount={Number(investment.amount)}
              dailyReturn={Number(investment.daily_return)}
              dailyProfit={dailyProfit}
              totalReturn={Number(investment.total_return)}
            />
            
            <InvestmentDetailTimeline 
              startDate={investment.start_date}
              endDate={investment.end_date}
              duration={investment.duration}
            />
          </div>
          
          <div className="space-y-6">
            <InvestmentDetailProgress 
              progress={progress}
              earnedSoFar={earnedSoFar}
              daysRemaining={daysRemaining}
              status={investment.status}
            />
            
            <InvestmentDetailActions />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentDetail;
