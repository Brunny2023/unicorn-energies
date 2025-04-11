
import React from "react";
import { WalletData } from "@/types/investment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { calculateWithdrawalFee } from "@/utils/investmentUtils";

interface WithdrawalCalculatorProps {
  loading: boolean;
  walletData: WalletData | null;
  amount: string;
  setAmount: (amount: string) => void;
  calculating: boolean;
  setCalculating: (calculating: boolean) => void;
  setWithdrawalRequest: (request: any) => void;
  toast: any;
}

const WithdrawalCalculator = ({
  loading,
  walletData,
  amount,
  setAmount,
  calculating,
  setCalculating,
  setWithdrawalRequest,
  toast
}: WithdrawalCalculatorProps) => {
  
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
      if (!walletData) {
        throw new Error("Wallet data not available");
      }
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

export default WithdrawalCalculator;
