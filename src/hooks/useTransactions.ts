
import { useState, useEffect } from "react";

// Mock transaction data interface
interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  date: string;
  userId: string;
}

// This is a mock implementation - in a real app, this would fetch from an API
export const useTransactions = (userId?: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Simulate API call with setTimeout
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            amount: 1000,
            type: 'deposit',
            status: 'completed',
            description: 'Initial deposit',
            date: new Date().toISOString(),
            userId: userId
          },
          {
            id: '2',
            amount: 250,
            type: 'withdrawal',
            status: 'pending',
            description: 'Withdrawal request',
            date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            userId: userId
          },
          {
            id: '3',
            amount: 500,
            type: 'investment',
            status: 'completed',
            description: 'Gold investment plan',
            date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            userId: userId
          },
          {
            id: '4',
            amount: 50,
            type: 'fee',
            status: 'completed',
            description: 'Platform fee',
            date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            userId: userId
          },
          {
            id: '5',
            amount: 100,
            type: 'profit',
            status: 'completed',
            description: 'Investment profit',
            date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
            userId: userId
          }
        ];
        
        setTransactions(mockTransactions);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  return { transactions, loading, error };
};
