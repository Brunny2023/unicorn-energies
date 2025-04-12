
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types/investment';
import { transformTicketData } from './ticketTransform';
import { getAllDummyTickets, getDummyUserTickets } from './dummyData';

// Development mode flag
export const DEVELOPMENT_MODE = true;

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
      return {
        id: `ticket-${Date.now()}`,
        user_id: userId,
        subject,
        message,
        status: 'open',
        priority: priority as 'low' | 'medium' | 'high',
        category,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
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

/**
 * Fetches a specific ticket by ID
 */
export const getTicketDetails = async (ticketId: string): Promise<Ticket | null> => {
  try {
    console.log('Fetching ticket details for ID:', ticketId);
    
    if (DEVELOPMENT_MODE) {
      console.log('Development mode: Returning dummy ticket details');
      const dummyTickets = getAllDummyTickets();
      const ticketMatch = dummyTickets.find(t => t.id === ticketId);
      return ticketMatch || null;
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
