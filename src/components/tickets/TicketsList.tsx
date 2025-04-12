
import React, { useEffect } from "react";
import { useUserTickets } from "@/hooks/tickets";
import TicketsListHeader from "./TicketsListHeader";
import TicketsListContent from "./TicketsListContent";

const TicketsList = () => {
  const { tickets, loading, error, fetchUserTickets } = useUserTickets();
  
  useEffect(() => {
    console.log("TicketsList component loaded");
    console.log("Tickets:", tickets);
    console.log("Loading state:", loading);
    console.log("Error state:", error);
  }, [tickets, loading, error]);

  return (
    <div className="space-y-6">
      <TicketsListHeader />
      <TicketsListContent tickets={tickets} loading={loading} />
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded p-4 text-red-500">
          {error}. <button 
            className="underline"
            onClick={() => fetchUserTickets()}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketsList;
