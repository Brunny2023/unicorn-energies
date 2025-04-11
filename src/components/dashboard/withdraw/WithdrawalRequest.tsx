
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { processWithdrawal } from "@/utils/investmentUtils";
import { useAuth } from "@/contexts/AuthContext";
import Captcha from "@/components/ui/Captcha";
import useCaptcha from "@/hooks/useCaptcha";

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
  onSuccess
}) => {
  const { user } = useAuth();
  const captcha = useCaptcha();

  const handleWithdraw = async () => {
    if (!withdrawalRequest || !withdrawalRequest.eligible) {
      return;
    }

    // Bypass captcha check in dev mode
    if (!devMode && !captcha.verified) {
      toast({
        variant: "destructive",
        title: "CAPTCHA Required",
        description: "Please complete the CAPTCHA verification first.",
      });
      return;
    }

    setProcessing(true);
    try {
      // In development mode, simulate a successful withdrawal
      const userId = user?.id || "dev-user-id";
      const result = await processWithdrawal(userId, withdrawalRequest.amount);

      if (result) {
        setSuccess(true);
        toast({
          title: "Withdrawal Successful",
          description: `$${withdrawalRequest.netAmount.toFixed(2)} has been withdrawn from your account.`,
        });
        // Refresh wallet data after withdrawal
        fetchWalletData();
        // Reset captcha
        if (captcha.resetCaptcha) {
          captcha.resetCaptcha();
        }
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
      
      {/* Bypassing captcha in development mode */}
      <div className="mt-4">
        {!devMode && <Captcha siteKey={captcha.siteKey} onVerify={captcha.handleVerify} />}
      </div>
      
      <Button
        onClick={handleWithdraw}
        disabled={processing || (!devMode && !captcha.verified)}
        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
      >
        {processing ? (
          <div className="h-4 w-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
        ) : (
          <>
            Confirm Withdrawal <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

export default WithdrawalRequest;
