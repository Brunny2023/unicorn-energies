
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { WithdrawalDestination, TransactionMetadata } from '@/types/investment';

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  status: string;
  description?: string;
  created_at: string;
  created_by?: string;
  metadata?: TransactionMetadata;
  updated_at?: string;
}

export const useTransactionActions = (refreshCallback: () => Promise<void>) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState<string | null>(null);
  
  const handleApproveWithdrawal = async (transactionId: string, userId: string, amount: number) => {
    setProcessing(transactionId);
    
    try {
      // Fetch transaction details to get destination information
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single();
        
      if (txError) throw txError;
      
      const transaction = txData as Transaction;
      
      // Update transaction status
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', transactionId)
        .eq('type', 'withdrawal')
        .eq('status', 'pending');
      
      if (updateError) throw updateError;
      
      // Update total_withdrawals in wallet - in development mode only, as column might not exist in production
      if (userId) {
        try {
          const { data: walletData, error: walletFetchError } = await supabase
            .from('wallets')
            .select('*')
            .eq('user_id', userId)
            .single();
          
          if (!walletFetchError && walletData) {
            // Check if total_withdrawals exists in the wallets table
            if ('total_withdrawals' in walletData) {
              // Type-safe way to get the total_withdrawals value
              const currentWithdrawals = typeof walletData.total_withdrawals === 'number' 
                ? walletData.total_withdrawals 
                : 0;
              
              const newTotalWithdrawals = currentWithdrawals + amount;
              
              await supabase
                .from('wallets')
                .update({ 
                  total_withdrawals: newTotalWithdrawals,
                  updated_at: new Date().toISOString()
                })
                .eq('user_id', userId);
            }
          }
        } catch (e) {
          console.error("Error updating wallet withdrawals:", e);
          // Continue even if this fails
        }
      }
      
      // In development mode, create notification manually
      // For production, you would need to create a notifications table
      console.log("Withdrawal approved:", {
        user_id: userId,
        type: 'withdrawal_approved',
        message: `Your withdrawal of $${amount.toFixed(2)} has been approved.`,
        metadata: {
          amount,
          transaction_id: transactionId,
          destination: transaction.metadata?.destination || null
        },
        read: false
      });
      
      toast({
        title: "Withdrawal Approved",
        description: `Withdrawal of $${amount.toLocaleString()} has been approved.`,
      });
      
      // Refresh transactions list
      await refreshCallback();
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      toast({
        title: "Error",
        description: "Failed to approve withdrawal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };
  
  const handleRejectWithdrawal = async (transactionId: string, userId: string, amount: number) => {
    setProcessing(transactionId);
    
    try {
      // Start a transaction
      // 1. Update transaction status
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ 
          status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', transactionId)
        .eq('type', 'withdrawal')
        .eq('status', 'pending');
      
      if (updateError) throw updateError;
      
      // 2. Add the amount back to user's wallet
      const { data: wallet, error: walletFetchError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', userId)
        .single();
      
      if (walletFetchError) throw walletFetchError;
      
      const newBalance = Number(wallet.balance) + Number(amount);
      
      const { error: walletError } = await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('user_id', userId);
      
      if (walletError) throw walletError;
      
      // In development mode, create notification manually
      // For production, you would need to create a notifications table
      console.log("Withdrawal rejected:", {
        user_id: userId,
        type: 'withdrawal_rejected',
        message: `Your withdrawal of $${amount.toFixed(2)} has been rejected and funds returned to your account.`,
        metadata: {
          amount,
          transaction_id: transactionId
        },
        read: false
      });
      
      toast({
        title: "Withdrawal Rejected",
        description: `Withdrawal of $${amount.toLocaleString()} has been rejected and funds returned to user's wallet.`,
      });
      
      // Refresh transactions list
      await refreshCallback();
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
      toast({
        title: "Error",
        description: "Failed to reject withdrawal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };
  
  return {
    handleApproveWithdrawal,
    handleRejectWithdrawal,
    processing
  };
};
