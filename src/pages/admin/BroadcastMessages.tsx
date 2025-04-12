
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import BroadcastMessageContainer from "@/components/admin/broadcast/BroadcastMessageContainer";

const BroadcastMessages = () => {
  return (
    <DashboardLayout isAdmin>
      <BroadcastMessageContainer />
    </DashboardLayout>
  );
};

export default BroadcastMessages;
