
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertCircle, Filter, Search, ArrowUpRight, ArrowDownRight, Clock, ExternalLink } from "lucide-react";
import { setupConsoleFilters } from "@/utils/consoleErrorFilter";
import { formatCurrency } from "@/utils/formatUtils";

// Mock transaction data for development
const MOCK_TRANSACTIONS = [
  {
    id: "tx_1234567890",
    type: "deposit",
    amount: 5000,
    status: "completed",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    description: "Initial investment deposit"
  },
  {
    id: "tx_2345678901",
    type: "investment",
    amount: 3000,
    status: "completed",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    description: "Gold plan investment"
  },
  {
    id: "tx_3456789012",
    type: "credit",
    amount: 180,
    status: "completed",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    description: "Investment returns"
  },
  {
    id: "tx_4567890123",
    type: "withdrawal",
    amount: 500,
    status: "pending",
    created_at: new Date(Date.now() - 259200000).toISOString(),
    description: "Requested withdrawal"
  }
];

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    setupConsoleFilters();
    console.log("Transactions page loaded");
    
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from an API here
        setTimeout(() => {
          setTransactions(MOCK_TRANSACTIONS);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return "bg-green-900/30 text-green-400";
      case "withdrawal":
        return "bg-red-900/30 text-red-400";
      case "investment":
        return "bg-blue-900/30 text-blue-400";
      case "credit":
        return "bg-purple-900/30 text-purple-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.id.toLowerCase().includes(searchLower) ||
          transaction.type.toLowerCase().includes(searchLower) ||
          (transaction.description &&
            transaction.description.toLowerCase().includes(searchLower))
        );
      }
      return true;
    })
    .filter((transaction) => {
      // Type filter
      if (filter === "all") return true;
      return transaction.type === filter;
    })
    .filter((transaction) => {
      // Date filter
      if (dateRange === "all") return true;
      
      const txDate = new Date(transaction.created_at);
      const now = new Date();
      
      if (dateRange === "today") {
        return txDate.toDateString() === now.toDateString();
      } else if (dateRange === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return txDate >= weekAgo;
      } else if (dateRange === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return txDate >= monthAgo;
      }
      
      return true;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-gray-400">View and manage your transaction history</p>
        </div>
        <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
          Export History
        </Button>
      </div>

      {/* Filters section */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
          />
        </div>
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px] bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="deposit">Deposits</SelectItem>
            <SelectItem value="withdrawal">Withdrawals</SelectItem>
            <SelectItem value="investment">Investments</SelectItem>
            <SelectItem value="credit">Credits</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[150px] bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-gray-300">
              <thead className="bg-unicorn-darkPurple/50 text-gray-400 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Transaction</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-unicorn-gold/20">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-4 py-4">
                        <div className="h-4 bg-gray-700/50 rounded w-20"></div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-6 bg-gray-700/50 rounded w-20"></div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="h-4 bg-gray-700/50 rounded ml-auto w-24"></div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 bg-gray-700/50 rounded w-16"></div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 bg-gray-700/50 rounded w-32"></div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="h-8 bg-gray-700/50 rounded w-8 ml-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-unicorn-darkPurple/30">
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-white font-mono text-xs">
                            #{transaction.id.substring(0, 8)}...
                          </div>
                          {transaction.description && (
                            <div className="text-xs text-gray-400 mt-1">{transaction.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                            transaction.type
                          )}`}
                        >
                          {getTransactionIcon(transaction.type)}
                          <span className="ml-1 capitalize">{transaction.type}</span>
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        <span className={transaction.type === "withdrawal" ? "text-red-400" : "text-green-400"}>
                          {transaction.type === "withdrawal" ? "-" : "+"}${formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`capitalize ${getTransactionStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-400">
                        {formatDate(transaction.created_at)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-unicorn-gold"
                          title="View details"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="h-8 w-8 text-gray-500 mb-2" />
                        <p>No transactions found</p>
                        {(searchTerm || filter !== "all" || dateRange !== "all") && (
                          <Button
                            variant="link"
                            className="text-unicorn-gold mt-2"
                            onClick={() => {
                              setSearchTerm("");
                              setFilter("all");
                              setDateRange("all");
                            }}
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
