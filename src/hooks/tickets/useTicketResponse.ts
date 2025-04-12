
import { Dispatch, SetStateAction } from 'react';
import { Ticket } from '@/types/investment';
import { updateTicket } from '@/utils/ticket/api/index';

type ToastType = {
  title: string;
  description: string;
  variant?: "default" | "destructive";
};

export const useTicketResponse = (
  tickets: Ticket[],
  setTickets: Dispatch<SetStateAction<Ticket[]>>,
  toast: (props: ToastType) => void
) => {
  const respondToTicket = async (ticketId: string, response: string) => {
    try {
      if (!response.trim()) {
        throw new Error("Response cannot be empty");
      }
      
      const updateData: Partial<Ticket> = {
        ai_response: response,
        status: "replied" as "open" | "in-progress" | "resolved" | "closed" | "replied",
        updated_at: new Date().toISOString()
      };
      
      const success = await updateTicket(ticketId, updateData);
      
      if (!success) {
        throw new Error("Failed to update ticket");
      }
      
      // Update the ticket in the local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, ...updateData } 
            : ticket
        )
      );
      
      toast({
        title: "Success",
        description: "Response sent successfully",
      });
      
      return true;
    } catch (err) {
      console.error('Error responding to ticket:', err);
      toast({
        title: "Error",
        description: "Failed to send response",
        variant: "destructive",
      });
      return false;
    }
  };

  return { respondToTicket };
};
