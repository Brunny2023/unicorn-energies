
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/types/investment";
import { getStatusBadge, getPriorityBadge } from "./ticketBadgeUtils";

interface TicketHeaderInfoProps {
  ticket: Ticket;
}

const TicketHeaderInfo = ({ ticket }: TicketHeaderInfoProps) => {
  return (
    <div className="flex flex-wrap justify-between items-start gap-4">
      <div>
        <h2 className="text-xl text-white">{ticket.subject}</h2>
        <div className="flex mt-2 space-x-2">
          {getStatusBadge(ticket.status)}
          {getPriorityBadge(ticket.priority)}
        </div>
      </div>
      <div className="text-right text-sm text-gray-400">
        <div>Created: {new Date(ticket.created_at).toLocaleString()}</div>
        <div>Last Updated: {new Date(ticket.updated_at).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default TicketHeaderInfo;
