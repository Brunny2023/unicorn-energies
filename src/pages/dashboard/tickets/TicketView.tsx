
import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useTicketDetails } from "@/hooks/useTickets";
import TicketDetails from "@/components/tickets/TicketDetails";

const TicketView = () => {
  const { id } = useParams<{ id: string }>();
  const { loading } = useTicketDetails(id);

  return (
    <DashboardLayout>
      <TicketDetails />
      {loading && <div className="sr-only" aria-live="polite" aria-busy="true">Loading ticket details...</div>}
    </DashboardLayout>
  );
};

export default TicketView;
