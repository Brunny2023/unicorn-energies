
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getUserTickets } from "@/utils/ticketUtils";
import TicketsListHeader from "./TicketsListHeader";
import TicketsListContent from "./TicketsListContent";
import { Ticket } from "@/types/investment";

// Development mode flag
const DEVELOPMENT_MODE = true;

// Sample dummy tickets for development
const DUMMY_TICKETS = [
  {
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
  {
    id: "ticket-2",
    user_id: "dev-user-id",
    subject: "Investment Question",
    message: "Can you explain how the Gold plan works?",
    status: "closed",
    priority: "medium",
    category: "investment",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    ai_response: "The Gold plan offers a daily return of 0.5% for 30 days..."
  },
  {
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
];

const TicketsList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In development mode, use dummy data
    if (DEVELOPMENT_MODE) {
      setTimeout(() => {
        setTickets(DUMMY_TICKETS as Ticket[]);
        setLoading(false);
      }, 1000); // Add a small delay to simulate loading
      return;
    }

    // For production, fetch real data
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      
      if (!user?.id) {
        throw new Error("User ID is required");
      }
      
      const ticketData = await getUserTickets(user.id);
      setTickets(ticketData);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Failed to load support tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <TicketsListHeader />
      <TicketsListContent tickets={tickets} loading={loading} />
    </div>
  );
};

export default TicketsList;
