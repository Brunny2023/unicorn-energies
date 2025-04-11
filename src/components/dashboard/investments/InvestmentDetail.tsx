
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types/investment";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, Calendar, DollarSign, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface InvestmentDetailProps {
  investment: Investment;
  onClose: () => void;
}

const InvestmentDetail = ({ investment, onClose }: InvestmentDetailProps) => {
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
            <div>
              <h3 className="text-lg font-medium text-unicorn-gold mb-4">Investment Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-unicorn-purple/20 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Amount Invested</div>
                  <div className="text-lg font-semibold">{formatCurrency(Number(investment.amount))}</div>
                </div>
                <div className="bg-unicorn-purple/20 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Daily Return</div>
                  <div className="text-lg font-semibold text-green-400">{investment.daily_return}%</div>
                </div>
                <div className="bg-unicorn-purple/20 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Daily Profit</div>
                  <div className="text-lg font-semibold text-green-400">{formatCurrency(dailyProfit)}</div>
                </div>
                <div className="bg-unicorn-purple/20 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Total Return</div>
                  <div className="text-lg font-semibold">{formatCurrency(Number(investment.total_return))}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-unicorn-gold mb-4">Timeline</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">Start Date</span>
                  </div>
                  <span>{formatDate(investment.start_date)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">End Date</span>
                  </div>
                  <span>{formatDate(investment.end_date)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">Duration</span>
                  </div>
                  <span>{investment.duration} days</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-unicorn-gold mb-4">Progress</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Completion</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-unicorn-purple/30" />
                </div>
                
                <div className="bg-unicorn-purple/20 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-unicorn-gold mr-2" />
                      <span className="text-gray-400">Profit Generated</span>
                    </div>
                    <span className="text-green-400">{formatCurrency(earnedSoFar)}</span>
                  </div>
                  <Separator className="bg-unicorn-gold/20 my-2" />
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-unicorn-gold mr-2" />
                      <span className="text-gray-400">Time Remaining</span>
                    </div>
                    <span>{daysRemaining} days</span>
                  </div>
                </div>
                
                {investment.status === 'active' && daysRemaining > 0 && (
                  <div className="bg-unicorn-gold/10 border border-unicorn-gold/20 p-4 rounded-lg">
                    <div className="flex">
                      <DollarSign className="h-5 w-5 text-unicorn-gold mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm">Your investment is actively generating returns.</p>
                        <p className="text-xs text-gray-400 mt-1">Daily profits are being added to your account balance.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {investment.status === 'pending' && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm">Your investment is pending activation.</p>
                        <p className="text-xs text-gray-400 mt-1">It will be activated within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {investment.status === 'completed' && (
                  <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                    <div className="flex">
                      <Zap className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm">This investment has been completed successfully.</p>
                        <p className="text-xs text-gray-400 mt-1">All profits have been added to your wallet.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium text-unicorn-gold mb-4">Actions</h3>
              <div className="flex flex-col space-y-2">
                <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                  Reinvest Profits
                </Button>
                <Button variant="outline" className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/10">
                  Download Statement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentDetail;
