
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, LineChart, CircleDollarSign, Clock } from "lucide-react";
import { formatCurrency } from "@/utils/formatUtils";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  description?: string;
}

interface TransactionsPanelProps {
  loading: boolean;
  transactions: Transaction[];
}

const TransactionsPanel: React.FC<TransactionsPanelProps> = ({ 
  loading = false, 
  transactions = []
}) => {
  // Ensure transactions is always an array to prevent runtime errors
  const transactionsList = transactions || [];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case 'investment':
        return <LineChart className="h-4 w-4 text-blue-500" />;
      case 'credit':
        return <CircleDollarSign className="h-4 w-4 text-green-500" />;
      case 'fee':
        return <CircleDollarSign className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-gray-300">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-unicorn-darkPurple/50 rounded-full mr-3"></div>
                  <div>
                    <div className="h-5 bg-unicorn-darkPurple/50 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-unicorn-darkPurple/50 rounded w-32"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-5 bg-unicorn-darkPurple/50 rounded w-16 mb-2"></div>
                  <div className="h-4 bg-unicorn-darkPurple/50 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        ) : transactionsList.length > 0 ? (
          <div className="divide-y divide-unicorn-gold/30">
            {transactionsList.map((transaction) => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-unicorn-darkPurple/80 p-2">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="font-medium text-white capitalize">{transaction.type}</div>
                    <div className="text-sm text-gray-400">
                      {formatDate(transaction.created_at)}
                    </div>
                    {transaction.description && (
                      <div className="text-xs text-gray-500 mt-1">{transaction.description}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">
                    {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}
                    {formatCurrency(transaction.amount)}
                  </div>
                  <div className={`text-xs ${getTransactionStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-400 mb-4">No transactions yet</p>
            <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
              <Link to="/dashboard/deposit">Make Your First Deposit</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsPanel;
