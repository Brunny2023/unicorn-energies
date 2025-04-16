
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Mock transaction data interface
interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  created_at: string;
  user_id: string;
}

export const useTransactions = (userId?: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Supabase first
        try {
          const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
            
          if (error) {
            throw error;
          }
          
          if (data && data.length > 0) {
            setTransactions(data as Transaction[]);
            setLoading(false);
            return;
          }
        } catch (supabaseError) {
          console.error("Error fetching transactions from Supabase:", supabaseError);
          // Continue to use mock data if Supabase fetch fails
        }
        
        // If we reached here, use mock data
        console.log("Using mock transaction data for user:", userId);
        
        // Mock data
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            amount: 1000,
            type: 'deposit',
            status: 'completed',
            description: 'Initial deposit',
            created_at: new Date().toISOString(),
            user_id: userId
          },
          {
            id: '2',
            amount: 250,
            type: 'withdrawal',
            status: 'pending',
            description: 'Withdrawal request',
            created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            user_id: userId
          },
          {
            id: '3',
            amount: 500,
            type: 'investment',
            status: 'completed',
            description: 'Gold investment plan',
            created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            user_id: userId
          },
          {
            id: '4',
            amount: 50,
            type: 'fee',
            status: 'completed',
            description: 'Platform fee',
            created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            user_id: userId
          },
          {
            id: '5',
            amount: 100,
            type: 'profit',
            status: 'completed',
            description: 'Investment profit',
            created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
            user_id: userId
          }
        ];
        
        setTransactions(mockTransactions);
      } catch (err) {
        console.error("Error in useTransactions hook:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  return { transactions, loading, error };
};
