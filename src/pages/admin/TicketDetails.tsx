
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useTicketDetails, useAdminTickets } from "@/hooks/tickets";
import TicketDetailHeader from "@/components/admin/tickets/TicketDetailHeader";
import TicketDetailCard from "@/components/admin/tickets/detail/TicketDetailCard";
import TicketResponseForm from "@/components/admin/tickets/TicketResponseForm";
import TicketsDetailsLoading from "@/components/tickets/TicketDetailsLoading";
import TicketDetailsNotFound from "@/components/tickets/TicketDetailsNotFound";

const AdminTicketDetails = () => {
  console.log("Rendering AdminTicketDetails component"); // Diagnostic log
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error, refreshTicket } = useTicketDetails(id);
  const { respondToTicket } = useAdminTickets();
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!response.trim() || !id) {
      return;
    }

    try {
      setIsSubmitting(true);
      await respondToTicket(id, response);
      setResponse('');
      // Refresh ticket data after submitting response
      refreshTicket();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout isAdmin>
        <TicketsDetailsLoading />
      </DashboardLayout>
    );
  }

  if (!ticket) {
    return (
      <DashboardLayout isAdmin>
        <TicketDetailsNotFound message={error || "Ticket not found"} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <TicketDetailHeader ticket={ticket} />
        <TicketDetailCard ticket={ticket} onRefresh={refreshTicket} />
        <TicketResponseForm 
          response={response}
          handleResponseChange={handleResponseChange}
          handleSubmitResponse={handleSubmitResponse}
          isSubmitting={isSubmitting}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminTicketDetails;
