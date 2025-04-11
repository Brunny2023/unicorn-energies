
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getUserTickets } from "@/utils/ticket";
import TicketsListHeader from "./TicketsListHeader";
import TicketsListContent from "./TicketsListContent";
import { Ticket } from "@/types/investment";

const TicketsList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("TicketsList component mounted, user:", user?.id);
    
    // Always fetch the tickets, even if development mode
    // This will return dummy data in dev mode
    if (user) {
      fetchTickets();
    } else {
      console.log("No user found, not fetching tickets");
      setLoading(false);
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      console.log("Fetching tickets for user:", user?.id);
      setLoading(true);
      
      if (!user?.id) {
        console.error("User ID is required but not found");
        throw new Error("User ID is required");
      }
      
      const ticketData = await getUserTickets(user.id);
      console.log("Tickets fetched:", ticketData.length);
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
