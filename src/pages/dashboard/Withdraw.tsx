
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { WalletData } from "@/types/investment";
import WithdrawalCalculator from "@/components/dashboard/withdraw/WithdrawalCalculator";
import WithdrawalRequest from "@/components/dashboard/withdraw/WithdrawalRequest";
import WithdrawalSuccess from "@/components/dashboard/withdraw/WithdrawalSuccess";

// Development mode flag - set to true to bypass authentication and use dummy data
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
    } else if (DEVELOPMENT_MODE) {
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
      if (DEVELOPMENT_MODE || !user || !user.id) {
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
          <div>
            <h2 className="text-3xl font-bold text-white">Withdraw Funds</h2>
            <p className="text-gray-400 mt-1">
              Request a withdrawal from your investment account
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Stats */}
          <div className="lg:col-span-1">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30 h-full">
              <CardHeader>
                <CardTitle className="text-white">Wallet Summary</CardTitle>
                <CardDescription className="text-gray-400">
                  Your current balance and earnings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-16 bg-unicorn-gold/10 rounded-lg"></div>
                    <div className="h-16 bg-unicorn-gold/10 rounded-lg"></div>
                    <div className="h-16 bg-unicorn-gold/10 rounded-lg"></div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 rounded-lg bg-unicorn-gold/10 border border-unicorn-gold/30">
                      <div className="text-sm text-gray-400 mb-1">Available Balance</div>
                      <div className="text-2xl font-bold text-white">
                        ${walletData?.balance.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                      <div className="text-sm text-gray-400 mb-1">Accrued Profits</div>
                      <div className="text-2xl font-bold text-green-500">
                        ${walletData?.accrued_profits.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-unicorn-purple/10 border border-unicorn-purple/30">
                      <div className="text-sm text-gray-400 mb-1">Withdrawal Fee</div>
                      <div className="text-2xl font-bold text-unicorn-purple">
                        {walletData?.withdrawal_fee_percentage}%
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-500/10 border border-gray-500/30">
                      <div className="text-sm text-gray-400 mb-1">Processing Time</div>
                      <div className="text-lg font-medium text-white">
                        1-2 Business Days
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
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
        </div>
        
        {/* Withdrawal History */}
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-white">Withdrawal History</CardTitle>
            <CardDescription className="text-gray-400">
              Your recent withdrawal requests and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-unicorn-gold/20">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Transaction ID</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Fee</th>
                    <th className="px-4 py-3 text-left">Net Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-unicorn-gold/10 hover:bg-unicorn-purple/10">
                    <td className="px-4 py-3 text-white">
                      {new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-300 font-mono">WD-284651</td>
                    <td className="px-4 py-3 text-white">$1,500.00</td>
                    <td className="px-4 py-3 text-red-400">$37.50</td>
                    <td className="px-4 py-3 text-unicorn-gold">$1,462.50</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-unicorn-gold/10 hover:bg-unicorn-purple/10">
                    <td className="px-4 py-3 text-white">
                      {new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-300 font-mono">WD-175432</td>
                    <td className="px-4 py-3 text-white">$2,800.00</td>
                    <td className="px-4 py-3 text-red-400">$70.00</td>
                    <td className="px-4 py-3 text-unicorn-gold">$2,730.00</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-unicorn-purple/10">
                    <td className="px-4 py-3 text-white">
                      {new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-300 font-mono">WD-098734</td>
                    <td className="px-4 py-3 text-white">$950.00</td>
                    <td className="px-4 py-3 text-red-400">$23.75</td>
                    <td className="px-4 py-3 text-unicorn-gold">$926.25</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
