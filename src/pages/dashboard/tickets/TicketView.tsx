
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTicketDetails } from "@/hooks/tickets";
import TicketDetails from "@/components/tickets/TicketDetails";

const TicketView = () => {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error, fetchTicket } = useTicketDetails(id);
  
  useEffect(() => {
    // Add debugging logs
    console.log("TicketView component loaded. ID:", id);
    console.log("Ticket data:", ticket);
    console.log("Loading state:", loading);
    console.log("Error state:", error);
  }, [id, ticket, loading, error]);

  return (
    <TicketDetails 
      ticket={ticket} 
      loading={loading} 
      error={error} 
    />
  );
};

export default TicketView;
