
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types/investment';
import { DEVELOPMENT_MODE } from '../config';

/**
 * Updates a specific ticket
 */
export const updateTicket = async (ticketId: string, updateData: Partial<Ticket>): Promise<boolean> => {
  try {
    console.log('Updating ticket:', ticketId, updateData);
    
    if (DEVELOPMENT_MODE) {
      console.log('Development mode: Simulating ticket update');
      return true;
    }
    
    // Extract only the fields that exist in the database
    const dbUpdateData = {
      subject: updateData.subject,
      message: updateData.message,
      status: updateData.status,
      priority: updateData.priority,
      ai_response: updateData.ai_response,
      ai_responded_at: updateData.ai_responded_at,
      // Category is handled locally, not in DB
    };

    const { error } = await supabase
      .from('tickets')
      .update(dbUpdateData)
      .eq('id', ticketId);

    if (error) {
      console.error('Supabase error updating ticket:', error);
      throw error;
    }
    
    console.log('Ticket updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating ticket:', error);
    return false;
  }
};
