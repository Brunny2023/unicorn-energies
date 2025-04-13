
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { WalletData, WithdrawalRequest } from "@/types/investment";
import WalletSummary from "@/components/dashboard/withdraw/WalletSummary";
import WithdrawalHistory from "@/components/dashboard/withdraw/WithdrawalHistory";
import WithdrawalForm from "@/components/dashboard/withdraw/WithdrawalForm";
import { fetchWalletData } from "@/utils/wallet";

// Define the withdrawal history item type
interface WithdrawalHistoryItem {
  id: string;
  date: Date;
  amount: number;
  fee: number;
  netAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  destination?: {
    name: string;
    method_type: string;
    details: any;
  };
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
    destination: {
      name: "My Bitcoin Wallet",
      method_type: "crypto",
      details: {
        network: "Bitcoin"
      }
    }
  },
  {
    id: "WD-175432",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    amount: 2800,
    fee: 70,
    netAmount: 2730,
    status: 'completed',
    destination: {
      name: "My Bank Account",
      method_type: "bank",
      details: {
        bank_name: "Chase Bank"
      }
    }
  },
  {
    id: "WD-098734",
    date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000),
    amount: 950,
    fee: 23.75,
    netAmount: 926.25,
    status: 'completed',
    destination: {
      name: "My PayPal",
      method_type: "digital_wallet",
      details: {
        email: "user@example.com"
      }
    }
  },
];

const Withdraw = () => {
  console.log("Rendering Withdraw component"); // Diagnostic log
  const { user } = useAuth();
  const { toast } = useToast();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalHistoryItem[]>(SAMPLE_WITHDRAWAL_HISTORY);
  const [lastDepositMethod, setLastDepositMethod] = useState<string | null>(null);

  useEffect(() => {
    console.log("Withdraw useEffect triggered, user:", user?.id); // Diagnostic log
    
    // Get the last deposit method from localStorage if available
    const savedMethod = localStorage.getItem("lastDepositMethod");
    if (savedMethod) {
      setLastDepositMethod(savedMethod);
    }
    
    if (user) {
      fetchUserWalletData();
    } else {
      // In development mode, create dummy wallet data
      console.log("Using dummy wallet data"); // Diagnostic log
      setWalletData({
        id: "dev-wallet-id",
        balance: 10000,
        accrued_profits: 1500,
        withdrawal_fee_percentage: 2.5,
        user_id: "dev-user-id",
        total_deposits: 15000,
        total_withdrawals: 5000
      });
      setLoading(false);
    }
  }, [user]);

  const fetchUserWalletData = async () => {
    try {
      setLoading(true);
      
      if (!user || !user.id) {
        // Fallback to dummy data
        setWalletData({
          id: "dev-wallet-id",
          balance: 10000,
          accrued_profits: 1500,
          withdrawal_fee_percentage: 2.5,
          user_id: "dev-user-id",
          total_deposits: 15000,
          total_withdrawals: 5000
        });
        setLoading(false);
        return;
      }

      const data = await fetchWalletData(user.id);
      
      if (!data) {
        // Fallback to dummy data in case of error
        setWalletData({
          id: "dev-wallet-id",
          balance: 10000,
          accrued_profits: 1500,
          withdrawal_fee_percentage: 2.5,
          user_id: user.id,
          total_deposits: 15000,
          total_withdrawals: 5000
        });
      } else {
        setWalletData(data);
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
        user_id: user?.id || "dev-user-id",
        total_deposits: 15000,
        total_withdrawals: 5000
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
      status: 'pending',
      destination: newWithdrawal.destination ? {
        name: newWithdrawal.destination.name,
        method_type: newWithdrawal.destination.method_type,
        details: newWithdrawal.destination.details
      } : undefined
    };
    
    setWithdrawalHistory(prev => [newItem, ...prev]);
  };

  return (
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
          <WalletSummary 
            walletData={walletData} 
            loading={loading} 
            lastDepositMethod={lastDepositMethod}
          />
        </div>
        
        {/* Withdrawal Form */}
        <div className="lg:col-span-2">
          <WithdrawalForm 
            walletData={walletData}
            loading={loading}
            fetchWalletData={fetchUserWalletData}
            onSuccessfulWithdrawal={addWithdrawalToHistory}
            lastDepositMethod={lastDepositMethod}
          />
        </div>
      </div>
      
      {/* Withdrawal History */}
      <WithdrawalHistory history={withdrawalHistory} loading={false} />
    </div>
  );
};

export default Withdraw;
