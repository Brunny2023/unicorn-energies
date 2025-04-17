
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { processWithdrawal } from "@/utils/wallet";
import { useAuth } from "@/contexts/AuthContext";
import { WithdrawalDestination } from "@/types/investment";

interface WithdrawalRequestProps {
  withdrawalRequest: {
    eligible: boolean;
    reason?: string;
    amount: number;
    fee: number;
    netAmount: number;
  };
  processing: boolean;
  setProcessing: (processing: boolean) => void;
  setSuccess: (success: boolean) => void;
  fetchWalletData: () => Promise<void>;
  toast: any;
  devMode: boolean;
  destination?: WithdrawalDestination | null;
  onSuccess?: () => void;
}

const WithdrawalRequest: React.FC<WithdrawalRequestProps> = ({
  withdrawalRequest,
  processing,
  setProcessing,
  setSuccess,
  fetchWalletData,
  toast,
  devMode,
  destination,
  onSuccess
}) => {
  const { user } = useAuth();

  const handleWithdraw = async () => {
    if (!withdrawalRequest || !withdrawalRequest.eligible) {
      return;
    }

    // Check if withdrawal destination is selected
    if (!destination) {
      toast({
        variant: "destructive",
        title: "Withdrawal Destination Required",
        description: "Please select or add a withdrawal destination.",
      });
      return;
    }

    setProcessing(true);
    try {
      // In development mode, simulate a successful withdrawal
      const userId = user?.id || "dev-user-id";
      const result = await processWithdrawal(
        userId, 
        withdrawalRequest.amount, 
        {
          method_type: destination.method_type,
          name: destination.name,
          details: destination.details
        }
      );

      if (result) {
        setSuccess(true);
        toast({
          title: "Withdrawal Request Sent Successfully",
          description: `Your request for $${withdrawalRequest.netAmount.toFixed(2)} has been sent for admin approval.`,
        });
        // Refresh wallet data after withdrawal
        fetchWalletData();
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Withdrawal processing failed");
      }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: "There was a problem processing your withdrawal. Please try again.",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!withdrawalRequest.eligible) {
    return (
      <div className="rounded-md bg-red-500/10 p-4 text-red-500 border border-red-500/30">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm font-medium">Withdrawal Not Eligible</p>
        </div>
        <p className="text-sm mt-1">{withdrawalRequest.reason}</p>
      </div>
    );
  }

  // Show warning if no destination selected
  if (!destination) {
    return (
      <div className="rounded-md bg-amber-500/10 p-4 text-amber-500 border border-amber-500/30 mt-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm font-medium">Please select a withdrawal destination</p>
        </div>
        <p className="text-sm mt-1">You need to select or add a withdrawal method before proceeding.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-green-500/10 p-4 text-green-500 border border-green-500/30">
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="h-4 w-4" />
        <p className="text-sm font-medium">Withdrawal Details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
        <div>Amount: ${withdrawalRequest.amount.toFixed(2)}</div>
        <div>Fee: ${withdrawalRequest.fee.toFixed(2)}</div>
        <div>Net Amount: ${withdrawalRequest.netAmount.toFixed(2)}</div>
      </div>

      <div className="mt-3 p-2 bg-unicorn-darkPurple/30 rounded border border-unicorn-gold/20">
        <p className="text-xs text-white mb-1">Withdrawal Destination:</p>
        <div className="text-sm text-white font-medium">{destination.name}</div>
        <div className="text-xs text-gray-400 mt-1">
          {destination.method_type === 'crypto' && 
            `${destination.details.network || 'Crypto'} • ${destination.details.address ? destination.details.address.substring(0, 6) + '...' + destination.details.address.substring(destination.details.address.length - 4) : ''}`
          }
          {destination.method_type === 'bank' && 
            `${destination.details.bank_name || 'Bank'} • ${destination.details.account_number || ''}`
          }
          {destination.method_type === 'digital_wallet' && 
            `${destination.details.email || 'Email/Username'}`
          }
        </div>
      </div>
      
      <Button
        onClick={handleWithdraw}
        disabled={processing}
        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
      >
        {processing ? (
          <div className="h-4 w-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
        ) : (
          <>
            Submit Withdrawal Request <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>

      <p className="text-xs text-gray-400 mt-2 text-center">
        Your withdrawal request will be reviewed by an admin. You'll be notified once it's processed.
      </p>
    </div>
  );
};

export default WithdrawalRequest;
