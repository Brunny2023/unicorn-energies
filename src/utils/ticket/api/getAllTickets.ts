
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types/investment';
import { transformTicketData } from '../ticketTransform';
import { DEVELOPMENT_MODE } from '../config';
import { getAllDummyTickets } from '../dummyData';

/**
 * Fetches all tickets in the system
 */
export const getAllTickets = async (): Promise<Ticket[]> => {
  try {
    console.log('Fetching all tickets');
    
    if (DEVELOPMENT_MODE) {
      console.log('Development mode: Returning all dummy tickets');
      return getAllDummyTickets();
    }
    
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching all tickets:', error);
      throw error;
    }
    
    console.log('All tickets fetched:', data?.length || 0);

    // Transform to match our Ticket type
    return (data || []).map(ticket => transformTicketData(ticket));
  } catch (error) {
    console.error('Error fetching all tickets:', error);
    return [];
  }
};
