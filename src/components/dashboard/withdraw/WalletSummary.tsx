
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletData } from "@/types/investment";

interface WalletSummaryProps {
  walletData: WalletData | null;
  loading: boolean;
}

const WalletSummary: React.FC<WalletSummaryProps> = ({ walletData, loading }) => {
  return (
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
  );
};

export default WalletSummary;
