
import { WalletData, WithdrawalRequest } from '@/types/investment';

// Withdrawal calculation utility
export const calculateWithdrawalRequest = (walletData: WalletData, requestedAmount: number): WithdrawalRequest => {
  try {
    const { balance, withdrawal_fee_percentage } = walletData;
    
    // Check if user has sufficient balance
    if (balance < requestedAmount) {
      return {
        eligible: false,
        reason: "Insufficient balance",
        amount: requestedAmount,
        fee: 0,
        netAmount: 0
      };
    }
    
    // Calculate fee
    const feePercentage = withdrawal_fee_percentage || 5; // default 5%
    const fee = (requestedAmount * feePercentage) / 100;
    const netAmount = requestedAmount - fee;
    
    return {
      eligible: true,
      amount: requestedAmount,
      fee: fee,
      netAmount: netAmount
    };
  } catch (error) {
    console.error("Error calculating withdrawal:", error);
    return {
      eligible: false,
      reason: "Error processing request",
      amount: 0,
      fee: 0,
      netAmount: 0
    };
  }
};

// For backward compatibility
export const calculateWithdrawalFee = calculateWithdrawalRequest;
