
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useTransactionActions = (onSuccess: () => void) => {
  const { toast } = useToast();

  const handleApproveWithdrawal = async (transactionId: string) => {
    try {
      // Update transaction status
      const { error } = await supabase
        .from('transactions')
        .update({ status: 'completed' })
        .eq('id', transactionId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Withdrawal approved successfully",
      });
      
      // Refresh data
      onSuccess();
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      toast({
        title: "Error",
        description: "Failed to approve withdrawal",
        variant: "destructive",
      });
    }
  };

  const handleRejectWithdrawal = async (transactionId: string) => {
    try {
      // Get transaction details
      const { data: transaction, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Update transaction status
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ status: 'rejected' })
        .eq('id', transactionId);
      
      if (updateError) throw updateError;
      
      // Return funds to user's wallet
      const { data: wallet, error: walletFetchError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', transaction.user_id)
        .single();
      
      if (walletFetchError) throw walletFetchError;
      
      const { error: walletUpdateError } = await supabase
        .from('wallets')
        .update({ 
          balance: wallet.balance + transaction.amount,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', transaction.user_id);
      
      if (walletUpdateError) throw walletUpdateError;
      
      toast({
        title: "Success",
        description: "Withdrawal rejected and funds returned to user",
      });
      
      // Refresh data
      onSuccess();
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
      toast({
        title: "Error",
        description: "Failed to reject withdrawal",
        variant: "destructive",
      });
    }
  };

  return {
    handleApproveWithdrawal,
    handleRejectWithdrawal
  };
};
