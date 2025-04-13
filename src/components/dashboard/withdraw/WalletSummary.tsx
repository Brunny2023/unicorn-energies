
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, BitcoinIcon, AlertCircle } from "lucide-react";
import { WalletData } from "@/types/investment";

interface WalletSummaryProps {
  walletData: WalletData | null;
  loading: boolean;
  lastDepositMethod?: string | null;
}

const WalletSummary = ({ 
  walletData, 
  loading,
  lastDepositMethod
}: WalletSummaryProps) => {
  const getMethodIcon = (method: string | null | undefined) => {
    if (!method) return null;
    
    switch(method) {
      case 'card':
        return <CreditCard className="h-5 w-5 text-violet-400" />;
      case 'bitcoin':
        return <BitcoinIcon className="h-5 w-5 text-amber-400" />;
      case 'ethereum':
        return (
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 784.37 1277.39" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"/>
            <path fill="currentColor" d="M392.07 0L0 650.54l392.07 231.75V472.33z"/>
            <path fill="currentColor" d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"/>
            <path fill="currentColor" d="M392.07 1277.38V956.52L0 724.89z"/>
          </svg>
        );
      case 'usdt':
        return (
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.25,2000,1000,2000,0,1552.25,0,1000,447.75,0,1000,0"/>
          </svg>
        );
      default:
        return <CreditCard className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const getMethodName = (method: string | null | undefined) => {
    if (!method) return 'No deposit method';
    
    switch(method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'bitcoin':
        return 'Bitcoin (BTC)';
      case 'ethereum':
        return 'Ethereum (ETH)';
      case 'usdt':
        return 'Tether (USDT)';
      default:
        return method.charAt(0).toUpperCase() + method.slice(1);
    }
  };
  
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>Your Wallet</span>
          {!loading && walletData && (
            <span className="text-sm bg-unicorn-gold/20 text-unicorn-gold px-2 py-1 rounded-full">
              {walletData.balance > 0 ? 'Active' : 'Empty'}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full bg-unicorn-purple/20" />
            <Skeleton className="h-8 w-3/4 bg-unicorn-purple/20" />
            <Skeleton className="h-20 w-full bg-unicorn-purple/20" />
          </div>
        ) : (
          <>
            <div className="text-center">
              <h3 className="text-lg text-gray-400 mb-1">Available Balance</h3>
              <div className="text-3xl font-bold text-unicorn-gold">
                ${walletData?.balance.toFixed(2) || '0.00'}
              </div>
              {walletData?.accrued_profits ? (
                <div className="text-sm text-green-400 mt-1">
                  +${walletData.accrued_profits.toFixed(2)} accrued profits
                </div>
              ) : null}
            </div>
            
            {lastDepositMethod && (
              <div className="bg-unicorn-purple/10 rounded-lg p-4 border border-unicorn-purple/30">
                <div className="flex items-center space-x-2">
                  {getMethodIcon(lastDepositMethod)}
                  <span className="text-white font-medium">Last Deposit Method</span>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  {getMethodName(lastDepositMethod)}
                </div>
                <div className="mt-2 text-xs text-amber-300 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  You can only withdraw using this method
                </div>
              </div>
            )}
            
            <div className="bg-unicorn-black/30 rounded-lg p-4 border border-unicorn-gold/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Total Deposits</h4>
                  <div className="text-white font-semibold">
                    ${walletData?.total_deposits?.toFixed(2) || '0.00'}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Total Withdrawn</h4>
                  <div className="text-white font-semibold">
                    ${walletData?.total_withdrawals?.toFixed(2) || '0.00'}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletSummary;
