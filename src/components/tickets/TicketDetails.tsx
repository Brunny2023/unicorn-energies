
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTicketDetails } from "@/hooks/useTickets";
import TicketDetailsHeader from "./TicketDetailsHeader";
import TicketDetailsContent from "./TicketDetailsContent";
import TicketDetailsLoading from "./TicketDetailsLoading";
import TicketDetailsNotFound from "./TicketDetailsNotFound";

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error } = useTicketDetails(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button asChild variant="outline" size="sm" className="text-gray-400">
          <Link to="/dashboard/tickets">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tickets
          </Link>
        </Button>
      </div>

      {loading ? (
        <TicketDetailsLoading />
      ) : !ticket ? (
        <TicketDetailsNotFound message={error || "Ticket not found"} />
      ) : (
        <>
          <TicketDetailsHeader ticket={ticket} />
          <TicketDetailsContent ticket={ticket} />
        </>
      )}
    </div>
  );
};

export default TicketDetails;
