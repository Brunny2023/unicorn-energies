
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types/investment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface InvestmentsListProps {
  loading: boolean;
  investments: Investment[];
}

const InvestmentsList = ({ loading, investments }: InvestmentsListProps) => {
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
          <p className="text-gray-400 mb-6">
            Start your investment journey by choosing from our curated investment plans.
          </p>
          <Button 
            className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
            asChild
          >
            <a href="/investment-plans">Explore Investment Plans</a>
          </Button>
        </CardContent>
      </Card>
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
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  {getStatusIcon(investment.status)}
                  <h3 className="text-lg font-semibold text-white ml-2">
                    {investment.plan_id} Plan
                  </h3>
                </div>
                {getStatusBadge(investment.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-gray-400 text-sm">Investment Amount</p>
                  <p className="text-white font-medium">
                    {formatCurrency(Number(investment.amount))}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Expected Return</p>
                  <p className="text-unicorn-gold font-medium">
                    {formatCurrency(Number(investment.total_return))}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">End Date</p>
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
                >
                  View Details <ChevronRight className="ml-1 h-4 w-4" />
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
