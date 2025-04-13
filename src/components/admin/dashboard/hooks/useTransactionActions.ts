
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useTransactionActions = (refreshCallback: () => Promise<void>) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState<string | null>(null);
  
  const handleApproveWithdrawal = async (transactionId: string, userId: string, amount: number) => {
    setProcessing(transactionId);
    
    try {
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
      
      // Add notification or email here if needed
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
      const { error: walletError } = await supabase.rpc('restore_rejected_withdrawal', {
        p_transaction_id: transactionId,
        p_user_id: userId,
        p_amount: amount
      });
      
      if (walletError) throw walletError;
      
      // Add notification or email here if needed
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
