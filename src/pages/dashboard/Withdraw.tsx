
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { WalletData } from "@/types/investment";
import WithdrawalCalculator from "@/components/dashboard/withdraw/WithdrawalCalculator";
import WithdrawalRequest from "@/components/dashboard/withdraw/WithdrawalRequest";
import WithdrawalSuccess from "@/components/dashboard/withdraw/WithdrawalSuccess";
import WalletSummary from "@/components/dashboard/withdraw/WalletSummary";
import WithdrawalHistory from "@/components/dashboard/withdraw/WithdrawalHistory";

// Development mode flag - set to true to bypass authentication and use dummy data
const DEVELOPMENT_MODE = true;

// Define the withdrawal history item type
interface WithdrawalHistoryItem {
  id: string;
  date: Date;
  amount: number;
  fee: number;
  netAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
}

// Sample withdrawal history
const SAMPLE_WITHDRAWAL_HISTORY: WithdrawalHistoryItem[] = [
  {
    id: "WD-284651",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    amount: 1500,
    fee: 37.5,
    netAmount: 1462.5,
    status: 'completed',
  },
  {
    id: "WD-175432",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    amount: 2800,
    fee: 70,
    netAmount: 2730,
    status: 'completed',
  },
  {
    id: "WD-098734",
    date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000),
    amount: 950,
    fee: 23.75,
    netAmount: 926.25,
    status: 'completed',
  },
];

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
  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalHistoryItem[]>(SAMPLE_WITHDRAWAL_HISTORY);

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

  // Add new withdrawal to history after successful withdrawal
  const addWithdrawalToHistory = (newWithdrawal: any) => {
    const newItem: WithdrawalHistoryItem = {
      id: `WD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date(),
      amount: newWithdrawal.amount,
      fee: newWithdrawal.fee,
      netAmount: newWithdrawal.netAmount,
      status: 'pending' as const,
    };
    
    setWithdrawalHistory(prev => [newItem, ...prev]);
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
            <WalletSummary walletData={walletData} loading={loading} />
          </div>
          
          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <div className="bg-unicorn-darkPurple/80 border border-unicorn-gold/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Make a Withdrawal</h3>
              <p className="text-gray-400 mb-6">
                Enter the amount you wish to withdraw from your available balance.
              </p>
              
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
                      onSuccess={() => {
                        addWithdrawalToHistory(withdrawalRequest);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Withdrawal History */}
        <WithdrawalHistory history={withdrawalHistory} loading={false} />
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
