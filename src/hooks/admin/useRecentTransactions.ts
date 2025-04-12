
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TransactionItem } from '@/types/admin';

export const useRecentTransactions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState<TransactionItem[]>([]);

  useEffect(() => {
    if (user) {
      fetchRecentTransactions();
    } else {
      loadSampleTransactions();
    }
  }, [user]);

  const loadSampleTransactions = () => {
    console.log("Loading sample transactions for development");
    
    const sampleTransactions: TransactionItem[] = [
      {
        id: "tx-1",
        user_id: "user-1",
        type: "deposit",
        amount: 5000,
        status: "completed",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Sample deposit transaction",
      },
      {
        id: "tx-2",
        user_id: "user-2",
        type: "withdrawal",
        amount: 2000,
        status: "pending",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Sample withdrawal transaction",
      },
    ];
    
    setRecentTransactions(sampleTransactions);
    setLoading(false);
  };

  const fetchRecentTransactions = async () => {
    try {
      console.log("Fetching recent transactions...");
      setLoading(true);
      
      // Check if we can connect to Supabase
      try {
        const { error: testError } = await supabase.from('transactions').select('count', { count: 'exact', head: true });
        if (testError) {
          console.error("Error connecting to Supabase:", testError);
          loadSampleTransactions();
          return;
        }
      } catch (connectionError) {
        console.error("Failed to connect to Supabase:", connectionError);
        loadSampleTransactions();
        return;
      }
      
      // Fetch recent transactions
      let transactions = [];
      try {
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select(`
            id, 
            user_id, 
            type, 
            amount, 
            status, 
            created_at, 
            description, 
            created_by
          `)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (transactionsError) {
          console.error("Error fetching transactions:", transactionsError);
          loadSampleTransactions();
          return;
        } else {
          transactions = transactionsData || [];
          console.log("Recent transactions:", transactions);
        }
      } catch (error) {
        console.error("Failed to fetch recent transactions:", error);
        loadSampleTransactions();
        return;
      }
      
      // Convert transactions to TransactionItem type
      const transactionItems: TransactionItem[] = transactions?.map(transaction => ({
        ...transaction,
        description: transaction.description || "Transaction"
      })) || [];
      
      setRecentTransactions(transactionItems);
      
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast({
        title: "Error",
        description: "Failed to load transaction data",
        variant: "destructive",
      });
      loadSampleTransactions();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    recentTransactions,
    fetchRecentTransactions
  };
};
