
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useTransactions } from "@/hooks/useTransactions";
import TransactionsTable from "@/components/dashboard/transactions/TransactionsTable";
import TransactionFilters from "@/components/dashboard/transactions/TransactionFilters";
import DashboardTopNav from "@/components/dashboard/layout/DashboardTopNav";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

// Define the local Transaction type that matches the TransactionsTable component's expectations
interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  date: string;
}

const Transactions = () => {
  const { user } = useAuth();
  const { transactions, loading, error } = useTransactions(user?.id);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    if (transactions) {
      // Map the transactions from useTransactions hook to match the expected Transaction interface
      const formattedTransactions = transactions.map(tx => ({
        id: tx.id,
        amount: tx.amount,
        type: tx.type,
        status: tx.status,
        description: tx.description || "",
        date: tx.created_at // Map created_at to date
      }));
      
      let filtered = [...formattedTransactions];
      
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(tx => 
          tx.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.amount.toString().includes(searchQuery) ||
          tx.status?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter(tx => tx.status === statusFilter);
      }
      
      // Apply type filter
      if (typeFilter !== "all") {
        filtered = filtered.filter(tx => tx.type === typeFilter);
      }
      
      setFilteredTransactions(filtered);
    }
  }, [transactions, searchQuery, statusFilter, typeFilter]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard" className="text-gray-400 hover:text-unicorn-gold">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-unicorn-gold">Transactions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-2xl font-bold text-white">Transaction History</h1>
          <p className="text-gray-400">View your complete transaction history</p>
        </div>
        
        {/* Dashboard navigation tabs */}
        <DashboardTopNav />
        
        {/* Transactions content */}
        <TransactionFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
        
        <TransactionsTable 
          transactions={filteredTransactions} 
          loading={loading} 
          error={error} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
