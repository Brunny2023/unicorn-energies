
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types/investment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar, 
  ArrowRight,
  DollarSign,
  Info,
  Sparkles
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import InvestmentDetail from "./InvestmentDetail";

interface InvestmentsListProps {
  loading: boolean;
  investments: Investment[];
}

const InvestmentsList = ({ loading, investments }: InvestmentsListProps) => {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

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

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  // Calculate days remaining
  const calculateDaysRemaining = (endDate: string): number => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Calculate progress percentage
  const calculateProgress = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    if (totalDuration <= 0) return 0;
    
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };
  
  // Handle view details
  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
  };
  
  // Close details
  const closeDetails = () => {
    setSelectedInvestment(null);
  };

  // Calculate daily profit
  const calculateDailyProfit = (investment: Investment): number => {
    return (Number(investment.amount) * Number(investment.daily_return)) / 100;
  };

  // If loading, show skeleton
  if (loading) {
    return (
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader>
          <CardTitle className="text-white">Your Investments</CardTitle>
          <CardDescription className="text-gray-400">
            Loading your investment portfolio...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="p-4 border border-unicorn-gold/20 rounded-lg animate-pulse"
              >
                <div className="h-6 bg-unicorn-gold/20 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-unicorn-gold/10 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-unicorn-gold/10 rounded w-1/4"></div>
                  <div className="h-4 bg-unicorn-gold/10 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // If no investments, show message
  if (investments.length === 0) {
    return (
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader>
          <CardTitle className="text-white">Your Investments</CardTitle>
          <CardDescription className="text-gray-400">
            You don't have any investments yet.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="py-8">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full p-3 bg-unicorn-gold/10 border border-unicorn-gold/20">
                <Sparkles className="h-8 w-8 text-unicorn-gold" />
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Start Your Investment Journey</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Choose from our carefully curated investment plans and start growing your wealth today with UnicornVest.
            </p>
            <Button 
              className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
              asChild
            >
              <a href="/investment-plans">
                Explore Investment Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If selected investment, show details
  if (selectedInvestment) {
    return (
      <InvestmentDetail 
        investment={selectedInvestment} 
        onClose={closeDetails} 
      />
    );
  }

  // Show investments
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Your Investments</CardTitle>
        <CardDescription className="text-gray-400">
          Manage your active investments and track returns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investments.map((investment) => (
            <div 
              key={investment.id} 
              className="p-4 border border-unicorn-gold/20 rounded-lg bg-unicorn-darkPurple/50 hover:bg-unicorn-darkPurple/70 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  {getStatusIcon(investment.status)}
                  <h3 className="text-lg font-semibold text-white ml-2">
                    {investment.plan_id} Plan
                  </h3>
                  <span className="ml-3">{getStatusBadge(investment.status)}</span>
                </div>
                <div className="text-sm text-unicorn-gold font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {formatCurrency(calculateDailyProfit(investment))} daily return
                </div>
              </div>
              
              {investment.status === 'active' && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(calculateProgress(investment.start_date, investment.end_date))}%</span>
                  </div>
                  <Progress 
                    value={calculateProgress(investment.start_date, investment.end_date)} 
                    className="h-1.5 bg-unicorn-purple/30" 
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-gray-400 text-sm flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                    Investment Amount
                  </p>
                  <p className="text-white font-medium">
                    {formatCurrency(Number(investment.amount))}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-gray-500" />
                    Expected Return
                  </p>
                  <p className="text-unicorn-gold font-medium">
                    {formatCurrency(Number(investment.total_return))}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm flex items-center">
                    {investment.status === 'completed' ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1 text-gray-500" />
                        Completed On
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                        {investment.status === 'active' ? `${calculateDaysRemaining(investment.end_date)} Days Left` : 'End Date'}
                      </>
                    )}
                  </p>
                  <p className="text-white font-medium">
                    {formatDate(investment.end_date)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline" 
                  size="sm"
                  className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20"
                  onClick={() => handleViewDetails(investment)}
                >
                  <Info className="h-4 w-4 mr-1" />
                  View Details 
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentsList;
