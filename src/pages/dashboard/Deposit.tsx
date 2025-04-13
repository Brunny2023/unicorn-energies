
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DepositContainer from "@/components/dashboard/deposit/DepositContainer";

const Deposit = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Deposit Funds</h1>
          <p className="text-gray-400">Add funds to your account using your preferred payment method</p>
        </div>
        
        <DepositContainer />
      </div>
    </DashboardLayout>
  );
};

export default Deposit;
