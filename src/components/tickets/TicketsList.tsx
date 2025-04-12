
import React from "react";
import { useUserTickets } from "@/hooks/useTickets";
import TicketsListHeader from "./TicketsListHeader";
import TicketsListContent from "./TicketsListContent";

const TicketsList = () => {
  const { tickets, loading, error, fetchTickets } = useUserTickets();

  return (
    <div className="space-y-6">
      <TicketsListHeader />
      <TicketsListContent tickets={tickets} loading={loading} />
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded p-4 text-red-500">
          {error}. <button 
            className="underline"
            onClick={() => fetchTickets()}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketsList;
