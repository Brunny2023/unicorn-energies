
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { WalletData } from "@/types/investment";
import WithdrawalCalculator from "@/components/dashboard/withdraw/WithdrawalCalculator";
import WithdrawalRequest from "@/components/dashboard/withdraw/WithdrawalRequest";
import WithdrawalSuccess from "@/components/dashboard/withdraw/WithdrawalSuccess";

// Development mode flag - set to true to bypass authentication
const DEVELOPMENT_MODE = true;

const Withdraw = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [amount, setAmount] = useState("");
  const [withdrawalRequest, setWithdrawalRequest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

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
              <WithdrawalSuccess />
            ) : (
              <>
                <WithdrawalCalculator 
                  loading={loading}
                  walletData={walletData}
                  amount={amount}
                  setAmount={setAmount}
                  calculating={calculating}
                  setCalculating={setCalculating}
                  setWithdrawalRequest={setWithdrawalRequest}
                  toast={toast}
                />
                {withdrawalRequest && (
                  <WithdrawalRequest 
                    withdrawalRequest={withdrawalRequest}
                    processing={processing}
                    setProcessing={setProcessing}
                    setSuccess={setSuccess}
                    fetchWalletData={fetchWalletData}
                    toast={toast}
                    devMode={DEVELOPMENT_MODE}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
