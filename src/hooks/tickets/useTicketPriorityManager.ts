
import { Dispatch, SetStateAction } from 'react';
import { Ticket } from '@/types/investment';
import { updateTicket } from '@/utils/ticket/api/index';

type TicketPriority = "high" | "medium" | "low";
type ToastType = {
  title: string;
  description: string;
  variant?: "default" | "destructive";
};

export const useTicketPriorityManager = (
  tickets: Ticket[],
  setTickets: Dispatch<SetStateAction<Ticket[]>>,
  toast: (props: ToastType) => void
) => {
  const updateTicketPriority = async (ticketId: string, priority: TicketPriority) => {
    try {
      const updateData: Partial<Ticket> = { priority };
      
      const success = await updateTicket(ticketId, updateData);
      
      if (!success) {
        throw new Error("Failed to update ticket priority");
      }
      
      // Update the ticket in the local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, priority, updated_at: new Date().toISOString() } 
            : ticket
        )
      );
      
      toast({
        title: "Success",
        description: `Ticket priority updated to ${priority}`,
      });
      
      return true;
    } catch (err) {
      console.error('Error updating ticket priority:', err);
      toast({
        title: "Error",
        description: "Failed to update ticket priority",
        variant: "destructive",
      });
      return false;
    }
  };

  return { updateTicketPriority };
};
