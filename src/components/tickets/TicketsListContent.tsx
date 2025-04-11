
import React from "react";
import { Ticket } from "@/types/investment";
import TicketListItem from "./TicketListItem";
import TicketsEmptyState from "./TicketsEmptyState";
import TicketsLoadingSkeleton from "./TicketsLoadingSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TicketsListContentProps {
  tickets: Ticket[];
  loading: boolean;
}

const TicketsListContent: React.FC<TicketsListContentProps> = ({ tickets, loading }) => {
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Your Tickets</CardTitle>
        <CardDescription className="text-gray-400">
          View and manage your support requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <TicketsLoadingSkeleton />
        ) : tickets.length === 0 ? (
          <TicketsEmptyState />
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <TicketListItem key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketsListContent;
