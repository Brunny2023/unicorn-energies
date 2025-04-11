
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminRoute from "@/components/auth/AdminRoute";
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/investment";
import { getTicketDetails, updateTicket } from "@/utils/ticketUtils";
import TicketDetailHeader from "@/components/admin/tickets/TicketDetailHeader";
import TicketDetailCard from "@/components/admin/tickets/TicketDetailCard";
import TicketResponseForm from "@/components/admin/tickets/TicketResponseForm";

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

const AdminTicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("AdminTicketDetails mounted, fetching ticket with ID:", id);
    if (id) {
      fetchTicketDetails();
    }
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      console.log("Fetching ticket details for ID:", id);
      
      // Use dummy data for development mode
      if (DEVELOPMENT_MODE && id) {
        console.log("Using dummy ticket data in development mode");
        setTimeout(() => {
          const dummyTicket = DUMMY_TICKETS[id as keyof typeof DUMMY_TICKETS];
          if (dummyTicket) {
            console.log("Found dummy ticket:", dummyTicket);
            setTicket(dummyTicket as Ticket);
          } else {
            console.error("No dummy ticket found for ID:", id);
            toast({
              title: "Error",
              description: "Ticket not found",
              variant: "destructive"
            });
          }
          setLoading(false);
        }, 1000);
        return;
      }
      
      // Production mode
      const data = await getTicketDetails(id as string);
      console.log("Fetched ticket details:", data);
      setTicket(data);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      toast({
        title: "Error",
        description: "Failed to load ticket details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!response.trim()) {
      toast({
        title: "Missing response",
        description: "Please enter a response message",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Submitting response to ticket:", id);

      // In development mode, just update the local state
      if (DEVELOPMENT_MODE) {
        console.log("Development mode: updating local ticket state");
        setTimeout(() => {
          if (ticket) {
            const updatedTicket = {
              ...ticket,
              ai_response: response,
              ai_responded_at: new Date().toISOString(),
              status: 'resolved' as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied'
            };
            setTicket(updatedTicket);
            setResponse('');
            toast({
              title: "Response Sent",
              description: "Your response has been added to the ticket"
            });
          }
          setIsSubmitting(false);
        }, 1000);
        return;
      }

      // Production mode - update the ticket in the database
      const success = await updateTicket(id as string, {
        ai_response: response,
        ai_responded_at: new Date().toISOString(),
        status: 'resolved'
      });

      if (success) {
        toast({
          title: "Response Sent",
          description: "Your response has been added to the ticket"
        });

        // Refresh ticket data
        fetchTicketDetails();
        setResponse('');
      } else {
        throw new Error("Failed to update ticket");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast({
        title: "Response Failed",
        description: "There was a problem sending your response",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout isAdmin>
        <div className="flex justify-center p-8">
          <div className="animate-pulse space-y-4 w-full max-w-4xl">
            <div className="h-8 bg-gray-700/50 rounded w-1/3"></div>
            <div className="h-64 bg-gray-700/50 rounded w-full"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!ticket) {
    return (
      <DashboardLayout isAdmin>
        <div className="text-center p-8">
          <h3 className="text-xl text-white mb-4">Ticket not found</h3>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <TicketDetailHeader ticket={ticket} />
        
        <TicketDetailCard 
          ticket={ticket}
          response={response}
          setResponse={setResponse}
          handleSubmitResponse={handleSubmitResponse}
          isSubmitting={isSubmitting}
        />
        
        <TicketResponseForm 
          response={response}
          handleResponseChange={handleResponseChange}
          handleSubmitResponse={handleSubmitResponse}
          isSubmitting={isSubmitting}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminTicketDetails;
