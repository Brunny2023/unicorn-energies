
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/investment";
import TicketDetailsHeader from "./TicketDetailsHeader";
import TicketDetailsContent from "./TicketDetailsContent";
import TicketDetailsLoading from "./TicketDetailsLoading";
import TicketDetailsNotFound from "./TicketDetailsNotFound";
import { getTicketDetails } from "@/utils/ticket";

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && id) {
      fetchTicket(id);
    }
  }, [user, id]);

  const fetchTicket = async (ticketId: string) => {
    try {
      setLoading(true);
      
      // Use the utility function to get ticket details
      const ticketData = await getTicketDetails(ticketId);
      
      if (ticketData) {
        setTicket(ticketData);
      } else {
        toast({
          title: "Error",
          description: "Failed to load ticket details",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast({
        title: "Error",
        description: "Failed to load ticket details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
        <TicketDetailsNotFound />
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
