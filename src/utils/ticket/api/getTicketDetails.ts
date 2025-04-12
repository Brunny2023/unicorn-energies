
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types/investment';
import { transformTicketData } from '../ticketTransform';
import { DEVELOPMENT_MODE } from '../config';
import { getDummyTicketById } from '../dummyData';

/**
 * Fetches a specific ticket by ID
 */
export const getTicketDetails = async (ticketId: string): Promise<Ticket | null> => {
  try {
    console.log('Fetching ticket details for ID:', ticketId);
    
    if (DEVELOPMENT_MODE) {
      console.log('Development mode: Returning dummy ticket details');
      return getDummyTicketById(ticketId);
    }
    
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (error) {
      console.error('Supabase error fetching ticket details:', error);
      throw error;
    }
    
    console.log('Ticket details fetched successfully');
    
    return transformTicketData(data);
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    return null;
  }
};
