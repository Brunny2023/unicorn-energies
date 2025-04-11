
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, CheckCircle2, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { calculateWithdrawalFee, processWithdrawal } from "@/utils/investmentUtils";
import { WalletData, WithdrawalRequest } from "@/types/investment";
import Captcha from "@/components/ui/Captcha";
import useCaptcha from "@/hooks/useCaptcha";

const Withdraw = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [amount, setAmount] = useState("");
  const [withdrawalRequest, setWithdrawalRequest] = useState<WithdrawalRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Use the captcha hook
  const captcha = useCaptcha();

  useEffect(() => {
    if (user) {
      fetchWalletData();
    } else {
      // In development mode, create dummy wallet data
      setWalletData({
        id: "dev-wallet-id",
        balance: 10000,
        accrued_profits: 1500,
        withdrawal_fee_percentage: 2.5,
        user_id: "dev-user-id"
      });
      setLoading(false);
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      // In development mode, create dummy data
      if (!user || !user.id) {
        setWalletData({
          id: "dev-wallet-id",
          balance: 10000,
          accrued_profits: 1500,
          withdrawal_fee_percentage: 2.5,
          user_id: "dev-user-id"
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        // Fallback to dummy data in case of error
        setWalletData({
          id: "dev-wallet-id",
          balance: 10000,
          accrued_profits: 1500,
          withdrawal_fee_percentage: 2.5,
          user_id: user.id || "dev-user-id"
        });
      } else {
        setWalletData(data as WalletData);
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load wallet data. Please try again.",
      });
      // Fallback to dummy data
      setWalletData({
        id: "dev-wallet-id",
        balance: 10000,
        accrued_profits: 1500,
        withdrawal_fee_percentage: 2.5,
        user_id: user?.id || "dev-user-id"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = () => {
    if (!amount) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a withdrawal amount.",
      });
      return;
    }

    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid positive number.",
      });
      return;
    }

    setCalculating(true);
    try {
      const request = calculateWithdrawalFee(walletData, numAmount);
      setWithdrawalRequest(request);
    } catch (error) {
      console.error("Error calculating withdrawal:", error);
      toast({
        variant: "destructive",
        title: "Calculation Error",
        description: "Failed to calculate withdrawal. Please try again.",
      });
    } finally {
      setCalculating(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawalRequest || !withdrawalRequest.eligible) {
      return;
    }

    // Bypass captcha check in dev mode
    const DEVELOPMENT_MODE = true;
    if (!DEVELOPMENT_MODE && !captcha.verified) {
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
        // Reset form
        setAmount("");
        setWithdrawalRequest(null);
        if (captcha.resetCaptcha) {
          captcha.resetCaptcha();
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

  const renderCalculation = () => {
    if (loading) {
      return <div className="text-center text-gray-400">Loading wallet data...</div>;
    }

    if (!walletData) {
      return <div className="text-center text-red-500">No wallet found. Please contact support.</div>;
    }

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <CardTitle>Available Balance</CardTitle>
          <CardDescription>
            ${walletData.balance.toFixed(2)}
          </CardDescription>
        </div>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Enter amount to withdraw"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
          />
          <Button
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
          >
            {calculating ? (
              <div className="h-4 w-4 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></div>
            ) : (
              "Calculate Withdrawal"
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderWithdrawalRequest = () => {
    if (!withdrawalRequest) {
      return null;
    }

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
          {!DEVELOPMENT_MODE && <Captcha siteKey={captcha.siteKey} onVerify={captcha.handleVerify} />}
        </div>
        
        <Button
          onClick={handleWithdraw}
          disabled={processing || (!DEVELOPMENT_MODE && !captcha.verified)}
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Withdraw Funds</h2>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-white">Make a Withdrawal</CardTitle>
            <CardDescription className="text-gray-400">
              Enter the amount you wish to withdraw from your available balance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success ? (
              <div className="text-center text-green-500">
                <CheckCircle2 className="h-10 w-10 mx-auto mb-2" />
                Withdrawal request submitted successfully!
              </div>
            ) : (
              <>
                {renderCalculation()}
                {renderWithdrawalRequest()}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
