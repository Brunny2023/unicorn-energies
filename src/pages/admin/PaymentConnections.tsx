
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import PaymentConnectionsContainer from "@/components/admin/payments/PaymentConnectionsContainer";

const PaymentConnections = () => {
  return (
    <AdminLayout>
      <PaymentConnectionsContainer />
    </AdminLayout>
  );
};

export default PaymentConnections;
