
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

// Development mode flag
const DEVELOPMENT_MODE = true;

// Sample dummy tickets for development
const DUMMY_TICKETS = {
  "ticket-1": {
    id: "ticket-1",
    user_id: "dev-user-id",
    subject: "Withdrawal Issue",
    message: "I'm having trouble with my recent withdrawal. I submitted a withdrawal request for $1,500 two days ago, but it's still showing as pending in my account. The estimated processing time was 24 hours. Could you please check the status of my withdrawal and let me know when I can expect to receive the funds? My transaction ID is WD-78943.",
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
    message: "Can you explain how the Gold plan works? I'm interested in investing but I want to understand the details of the returns calculation, the lock-up period, and any fees that might apply to early withdrawals. Also, what's the minimum investment amount for this plan?",
    status: "closed",
    priority: "medium",
    category: "investment",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    ai_response: "The Gold investment plan offers a daily return rate of 0.5% over a 30-day period. Your investment remains locked for the full 30 days, during which you'll earn daily returns that are added to your account balance. The minimum investment amount for the Gold plan is $1,000.\n\nRegarding early withdrawals: If you need to withdraw before the 30-day period ends, a 10% early withdrawal fee will be applied to your initial investment amount. However, you'll still receive all accrued returns up to the withdrawal date.\n\nAll returns are automatically credited to your account daily, and you can track the performance of your investment in real-time from your dashboard.\n\nIf you have any other questions about the Gold plan or any of our other investment options, please let us know!",
    ai_responded_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  "ticket-3": {
    id: "ticket-3",
    user_id: "dev-user-id",
    subject: "Account Verification",
    message: "I need to verify my account for larger withdrawals. I understand that for withdrawals over $10,000, additional verification is required. Could you please let me know what documents I need to provide and how to complete this process? I'm planning to make a withdrawal next week and want to make sure everything is ready.",
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
          // Ensure category is set for dummy tickets too
          setTicket({
            ...dummyTicket,
            category: dummyTicket.category || 'general'
          } as Ticket);
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
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', ticketId)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      
      // Add category if missing
      setTicket({
        ...data,
        category: data.category || 'general'
      } as Ticket);
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
