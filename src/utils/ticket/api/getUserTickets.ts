
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types/investment';
import { transformTicketData } from '../ticketTransform';
import { DEVELOPMENT_MODE } from '../config';
import { getDummyUserTickets } from '../dummyData';

/**
 * Fetches all tickets for a specific user
 */
export const getUserTickets = async (userId: string): Promise<Ticket[]> => {
  try {
    console.log('Fetching tickets for user:', userId);
    
    if (DEVELOPMENT_MODE) {
      console.log('Development mode: Returning dummy user tickets');
      return getDummyUserTickets(userId);
    }
    
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching tickets:', error);
      throw error;
    }
    
    console.log('Tickets fetched:', data?.length || 0);

    // Transform to match our Ticket type
    return (data || []).map(ticket => transformTicketData(ticket));
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};
