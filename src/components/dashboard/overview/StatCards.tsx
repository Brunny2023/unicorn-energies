
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, LineChart, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/utils/formatUtils";

interface WalletData {
  balance: number;
  accrued_profits: number;
}

interface InvestmentStats {
  active_count: number;
  total_invested: number;
}

interface TicketStats {
  open_count: number;
  latest_ticket: any | null;
}

interface StatCardsProps {
  loading: boolean;
  walletData: WalletData | null;
  investmentStats: InvestmentStats;
  ticketStats: TicketStats;
}

const StatCards: React.FC<StatCardsProps> = ({ 
  loading, 
  walletData, 
  investmentStats, 
  ticketStats 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Wallet Card */}
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-300">Available Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-unicorn-gold" />
            {loading ? (
              <div className="animate-pulse">
                <div className="h-9 w-32 bg-unicorn-darkPurple/50 rounded"></div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-white">
                {formatCurrency(walletData?.balance || 0)}
              </div>
            )}
          </div>
          <div className="mt-2 flex text-sm text-gray-400">
            <span>Accrued Profits: </span>
            <span className="ml-1 text-unicorn-gold">
              {formatCurrency(walletData?.accrued_profits || 0)}
            </span>
          </div>
          <div className="mt-4 flex space-x-3">
            <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
              <Link to="/dashboard/deposit">Deposit</Link>
            </Button>
            <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
              <Link to="/dashboard/withdraw">Withdraw</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investments Card */}
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-300">Active Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <LineChart className="mr-2 h-5 w-5 text-unicorn-gold" />
            {loading ? (
              <div className="animate-pulse">
                <div className="h-9 w-10 bg-unicorn-darkPurple/50 rounded"></div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-white">{investmentStats.active_count}</div>
            )}
          </div>
          <div className="mt-2 flex text-sm text-gray-400">
            <span>Total Invested: </span>
            <span className="ml-1 text-unicorn-gold">
              {formatCurrency(investmentStats.total_invested)}
            </span>
          </div>
          <div className="mt-4">
            {investmentStats.active_count > 0 ? (
              <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                <Link to="/dashboard/investments">View Investments</Link>
              </Button>
            ) : (
              <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                <Link to="/investment-plans">Explore Plans</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tickets Card */}
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-300">Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-unicorn-gold" />
            {loading ? (
              <div className="animate-pulse">
                <div className="h-9 w-10 bg-unicorn-darkPurple/50 rounded"></div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-white">{ticketStats.open_count}</div>
            )}
          </div>
          {ticketStats.latest_ticket ? (
            <div className="mt-2 text-sm text-gray-400">
              <span>Latest: </span>
              <span className="text-white">{ticketStats.latest_ticket.subject}</span>
            </div>
          ) : (
            <div className="mt-2 text-sm text-gray-400">No open tickets</div>
          )}
          <div className="mt-4">
            <Button asChild className="text-unicorn-black bg-unicorn-gold hover:bg-unicorn-darkGold">
              <Link to="/dashboard/tickets">
                {ticketStats.open_count > 0 ? "View Tickets" : "Create Ticket"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
