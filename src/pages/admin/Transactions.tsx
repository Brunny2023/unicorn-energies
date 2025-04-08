
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import TransactionFilters from "@/components/admin/transactions/TransactionFilters";
import TransactionsTable from "@/components/admin/transactions/TransactionsTable";
import { TransactionItem } from "@/types/admin";

const Transactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const transactionTypes = ["deposit", "withdrawal", "investment", "credit"];
  const transactionStatuses = ["completed", "pending", "failed"];

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
      }) as TransactionItem[];
      
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
    
    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tx.user.full_name && tx.user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tx.description && tx.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(tx => selectedTypes.includes(tx.type));
    }
    
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(tx => selectedStatuses.includes(tx.status));
    }
    
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

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterTypes = (types: string[]) => {
    setSelectedTypes(types);
  };

  const handleFilterStatuses = (statuses: string[]) => {
    setSelectedStatuses(statuses);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold text-white">Transaction History</h2>
          <TransactionFilters 
            onSearch={handleSearchChange}
            onFilterTypes={handleFilterTypes}
            onFilterStatuses={handleFilterStatuses}
            onSort={handleSort}
            onRefresh={fetchTransactions}
            searchTerm={searchTerm}
            selectedTypes={selectedTypes}
            selectedStatuses={selectedStatuses}
            sortOrder={sortOrder}
            transactionTypes={transactionTypes}
            transactionStatuses={transactionStatuses}
          />
        </div>

        <TransactionsTable 
          transactions={filteredTransactions}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
};

export default Transactions;
