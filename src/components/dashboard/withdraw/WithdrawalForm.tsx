
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import WithdrawalCalculator from "@/components/dashboard/withdraw/WithdrawalCalculator";
import WithdrawalRequest from "@/components/dashboard/withdraw/WithdrawalRequest";
import WithdrawalSuccess from "@/components/dashboard/withdraw/WithdrawalSuccess";
import { WalletData } from "@/types/investment";

interface WithdrawalFormProps {
  walletData: WalletData | null;
  loading: boolean;
  fetchWalletData: () => Promise<void>;
  onSuccessfulWithdrawal: (withdrawalData: any) => void;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  walletData,
  loading,
  fetchWalletData,
  onSuccessfulWithdrawal
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [withdrawalRequest, setWithdrawalRequest] = useState<any | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Development mode flag - set to true to bypass authentication and use dummy data
  const DEVELOPMENT_MODE = true;

  return (
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
                onSuccessfulWithdrawal(withdrawalRequest);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WithdrawalForm;
