
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Ticket } from "@/types/investment";
import TicketDetailsHeader from "./TicketDetailsHeader";
import TicketDetailsContent from "./TicketDetailsContent";
import TicketDetailsLoading from "./TicketDetailsLoading";
import TicketDetailsNotFound from "./TicketDetailsNotFound";

interface TicketDetailsProps {
  ticket: Ticket | null;
  loading: boolean;
  error: string | null;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, loading, error }) => {
  useEffect(() => {
    console.log("TicketDetails component loaded");
    console.log("Props received - ticket:", ticket);
    console.log("Props received - loading:", loading);
    console.log("Props received - error:", error);
  }, [ticket, loading, error]);

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
