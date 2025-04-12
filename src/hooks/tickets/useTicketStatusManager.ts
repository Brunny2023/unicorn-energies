
import { Dispatch, SetStateAction } from 'react';
import { Ticket } from '@/types/investment';
import { updateTicket } from '@/utils/ticket/api/index';

type TicketStatus = "open" | "in-progress" | "resolved" | "closed" | "replied";
type ToastType = {
  title: string;
  description: string;
  variant?: "default" | "destructive";
};

export const useTicketStatusManager = (
  tickets: Ticket[],
  setTickets: Dispatch<SetStateAction<Ticket[]>>,
  toast: (props: ToastType) => void
) => {
  const updateTicketStatus = async (ticketId: string, status: TicketStatus) => {
    try {
      const updateData: Partial<Ticket> = { status };
      
      const success = await updateTicket(ticketId, updateData);
      
      if (!success) {
        throw new Error("Failed to update ticket status");
      }
      
      // Update the ticket in the local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, status, updated_at: new Date().toISOString() } 
            : ticket
        )
      );
      
      toast({
        title: "Success",
        description: `Ticket status updated to ${status}`,
      });
      
      return true;
    } catch (err) {
      console.error('Error updating ticket status:', err);
      toast({
        title: "Error",
        description: "Failed to update ticket status",
        variant: "destructive",
      });
      return false;
    }
  };

  return { updateTicketStatus };
};
