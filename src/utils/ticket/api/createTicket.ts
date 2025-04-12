
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types/investment';
import { transformTicketData } from '../ticketTransform';
import { DEVELOPMENT_MODE } from '../config';
import { getDummyTicket } from '../dummyData';

/**
 * Creates a new support ticket
 */
export const createSupportTicket = async (
  userId: string, 
  subject: string, 
  message: string, 
  priority: string, 
  category: string = 'general'
): Promise<Ticket | null> => {
  try {
    console.log('Creating support ticket:', { userId, subject, message, priority, category });
    
    // In development mode, return a dummy ticket
    if (DEVELOPMENT_MODE) {
      console.log('Development mode: Creating dummy ticket');
      return getDummyTicket(userId, subject, message, priority, category);
    }
    
    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          user_id: userId,
          subject: subject,
          message: message,
          status: 'open',
          priority: priority,
        },
      ])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase error creating ticket:', error);
      throw error;
    }
    
    console.log('Ticket created successfully:', data);

    return transformTicketData(data, category);
  } catch (error) {
    console.error('Error creating support ticket:', error);
    return null;
  }
};

// Alias for compatibility with component usage
export const createTicket = createSupportTicket;
