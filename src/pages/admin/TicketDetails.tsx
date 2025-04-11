
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/investment";
import { getTicketDetails, updateTicket } from "@/utils/ticket";
import TicketDetailHeader from "@/components/admin/tickets/TicketDetailHeader";
import TicketDetailCard from "@/components/admin/tickets/detail/TicketDetailCard";
import TicketResponseForm from "@/components/admin/tickets/TicketResponseForm";
import TicketDetailsLoading from "@/components/tickets/TicketDetailsLoading";
import TicketDetailsNotFound from "@/components/tickets/TicketDetailsNotFound";

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

      if (ticket) {
        const updatedTicket = {
          ...ticket,
          ai_response: response,
          ai_responded_at: new Date().toISOString(),
          status: 'resolved' as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied'
        };

        const success = await updateTicket(id as string, {
          ai_response: response,
          ai_responded_at: new Date().toISOString(),
          status: 'resolved'
        });

        if (success) {
          setTicket(updatedTicket);
          setResponse('');
          toast({
            title: "Response Sent",
            description: "Your response has been added to the ticket"
          });
        } else {
          throw new Error("Failed to update ticket");
        }
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
        <TicketDetailsLoading />
      </DashboardLayout>
    );
  }

  if (!ticket) {
    return (
      <DashboardLayout isAdmin>
        <TicketDetailsNotFound />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <TicketDetailHeader ticket={ticket} />
        <TicketDetailCard ticket={ticket} />
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
