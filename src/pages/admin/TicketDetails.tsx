
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useTicketDetails, useAdminTickets } from "@/hooks/tickets";
import TicketDetailHeader from "@/components/admin/tickets/TicketDetailHeader";
import TicketDetailCard from "@/components/admin/tickets/detail/TicketDetailCard";
import TicketResponseForm from "@/components/admin/tickets/TicketResponseForm";
import TicketDetailsLoading from "@/components/tickets/TicketDetailsLoading";
import TicketDetailsNotFound from "@/components/tickets/TicketDetailsNotFound";

const AdminTicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error } = useTicketDetails(id);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout isAdmin>
        <TicketDetailsLoading />
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
        <TicketDetailCard ticket={ticket} />
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
