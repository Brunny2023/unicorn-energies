
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/investment";
import TicketDetailsHeader from "./TicketDetailsHeader";
import TicketDetailsContent from "./TicketDetailsContent";
import TicketDetailsLoading from "./TicketDetailsLoading";
import TicketDetailsNotFound from "./TicketDetailsNotFound";
import { getTicketDetails } from "@/utils/ticketUtils";

// Development mode flag
const DEVELOPMENT_MODE = true;

// Sample dummy tickets for development
const DUMMY_TICKETS = {
  "ticket-1": {
    id: "ticket-1",
    user_id: "dev-user-id",
    subject: "Withdrawal Issue",
    message: "I'm having trouble with my recent withdrawal...",
    status: "open",
    priority: "high",
    category: "withdrawal",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  "ticket-2": {
    id: "ticket-2",
    user_id: "dev-user-id",
    subject: "Investment Question",
    message: "Can you explain how the Gold plan works?",
    status: "closed",
    priority: "medium",
    category: "investment",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    ai_response: "The Gold plan offers a daily return of 0.5% for 30 days...",
    ai_responded_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  "ticket-3": {
    id: "ticket-3",
    user_id: "dev-user-id",
    subject: "Account Verification",
    message: "I need to verify my account for larger withdrawals.",
    status: "in_progress",
    priority: "medium",
    category: "account",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
};

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In development mode, use dummy data
    if (DEVELOPMENT_MODE && id) {
      setTimeout(() => {
        const dummyTicket = DUMMY_TICKETS[id as keyof typeof DUMMY_TICKETS];
        if (dummyTicket) {
          setTicket(dummyTicket as Ticket);
        } else {
          toast({
            title: "Error",
            description: "Ticket not found",
            variant: "destructive",
          });
        }
        setLoading(false);
      }, 1000); // Add a small delay to simulate loading
      return;
    }

    // For production, fetch real data
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
