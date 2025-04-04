
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  LineChart,
  CircleDollarSign,
  Clock,
  ExternalLink,
  Filter
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Transaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  description: string | null;
  user: {
    email: string;
    full_name: string | null;
  };
}

const AdminTransactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("desc");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [searchTerm, transactions, selectedTypes, selectedStatuses]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select(`
          *,
          user:profiles!transactions_user_id_fkey(
            email,
            full_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Ensure we have a valid user object for each transaction
      const processedData = data?.map(tx => {
        if (!tx.user || typeof tx.user === 'string' || 'error' in tx.user) {
          return {
            ...tx,
            user: {
              email: 'Unknown',
              full_name: null
            }
          };
        }
        return tx;
      }) as Transaction[];
      
      setTransactions(processedData);
      setFilteredTransactions(processedData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load transactions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = [...transactions];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tx.user.full_name && tx.user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tx.description && tx.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(tx => selectedTypes.includes(tx.type));
    }
    
    // Apply status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(tx => selectedStatuses.includes(tx.status));
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOrder === "desc") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });
    
    setFilteredTransactions(filtered);
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
    
    const sorted = [...filteredTransactions].sort((a, b) => {
      if (order === "desc") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });
    
    setFilteredTransactions(sorted);
  };

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
      case "investment":
        return <LineChart className="h-4 w-4 text-blue-500" />;
      case "credit":
        return <CircleDollarSign className="h-4 w-4 text-green-500" />;
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

  const transactionTypes = ["deposit", "withdrawal", "investment", "credit"];
  const transactionStatuses = ["completed", "pending", "failed"];

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold text-white">Transaction History</h2>
          <div className="w-full sm:w-auto flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-unicorn-gold/30 text-unicorn-gold">
                  <Filter className="h-4 w-4 mr-2" />
                  Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-unicorn-darkPurple/90 border-unicorn-gold/30 text-white">
                {transactionTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      setSelectedTypes(
                        checked
                          ? [...selectedTypes, type]
                          : selectedTypes.filter((t) => t !== type)
                      );
                    }}
                    className="capitalize"
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-unicorn-gold/30 text-unicorn-gold">
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-unicorn-darkPurple/90 border-unicorn-gold/30 text-white">
                {transactionStatuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={(checked) => {
                      setSelectedStatuses(
                        checked
                          ? [...selectedStatuses, status]
                          : selectedStatuses.filter((s) => s !== status)
                      );
                    }}
                    className="capitalize"
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={sortOrder} onValueChange={handleSort}>
              <SelectTrigger className="w-[120px] bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
                <SelectItem value="desc">Newest first</SelectItem>
                <SelectItem value="asc">Oldest first</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20"
              onClick={fetchTransactions}
            >
              Refresh
            </Button>
          </div>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-gray-300">
                <thead className="bg-unicorn-darkPurple/50 text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Transaction</th>
                    <th className="px-4 py-3 text-left">User</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-unicorn-gold/20">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-4 py-4">
                          <div className="h-4 bg-gray-700/50 rounded w-20"></div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-4 bg-gray-700/50 rounded w-40"></div>
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
                          <div className="text-white font-mono text-xs">
                            #{transaction.id.substring(0, 8)}...
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-white">
                              {transaction.user?.full_name || "No Name"}
                            </div>
                            <div className="text-xs text-gray-400">{transaction.user?.email}</div>
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
                            {transaction.type === "withdrawal" ? "-" : "+"}${transaction.amount.toFixed(2)}
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
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminTransactions;
