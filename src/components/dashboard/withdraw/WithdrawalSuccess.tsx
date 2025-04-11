
import React from "react";
import { CheckCircle2 } from "lucide-react";

const WithdrawalSuccess = () => {
  return (
    <div className="text-center text-green-500">
      <CheckCircle2 className="h-10 w-10 mx-auto mb-2" />
      <p className="text-lg font-medium">Withdrawal request submitted successfully!</p>
      <p className="text-sm text-gray-400 mt-2">
        Your funds will be processed and transferred to your account within 1-2 business days.
      </p>
    </div>
  );
};

export default WithdrawalSuccess;
