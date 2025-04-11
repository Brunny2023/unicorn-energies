
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types/investment';

export const createSupportTicket = async (userId: string, subject: string, message: string, priority: string, category: string = 'general'): Promise<Ticket | null> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          user_id: userId,
          subject: subject,
          message: message,
          status: 'open',
          priority: priority,
          category: category,
        },
      ])
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      user_id: data.user_id,
      subject: data.subject,
      message: data.message || '',
      status: data.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
      priority: data.priority as 'low' | 'medium' | 'high',
      category: data.category || 'general',
      created_at: data.created_at,
      updated_at: data.updated_at,
      ai_response: data.ai_response,
      ai_responded_at: data.ai_responded_at
    };
  } catch (error) {
    console.error('Error creating support ticket:', error);
    return null;
  }
};

// Alias for compatibility with component usage
export const createTicket = createSupportTicket;

export const getUserTickets = async (userId: string): Promise<Ticket[]> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform to match our Ticket type, ensuring category is always populated
    return (data || []).map(ticket => ({
      id: ticket.id,
      user_id: ticket.user_id,
      subject: ticket.subject,
      message: ticket.message || '',
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
      priority: ticket.priority as 'low' | 'medium' | 'high',
      category: ticket.category || 'general', // Default to 'general' if category is missing
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
      ai_response: ticket.ai_response,
      ai_responded_at: ticket.ai_responded_at
    }));
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};

export const getTicketDetails = async (ticketId: string): Promise<Ticket | null> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (error) throw error;
    
    // Transform to match our Ticket type
    return {
      id: data.id,
      user_id: data.user_id,
      subject: data.subject,
      message: data.message || '',
      status: data.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
      priority: data.priority as 'low' | 'medium' | 'high',
      category: data.category || 'general', // Default to 'general' if category is missing
      created_at: data.created_at,
      updated_at: data.updated_at,
      ai_response: data.ai_response,
      ai_responded_at: data.ai_responded_at
    };
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    return null;
  }
};

export const updateTicket = async (ticketId: string, updateData: Partial<Ticket>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tickets')
      .update(updateData)
      .eq('id', ticketId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating ticket:', error);
    return false;
  }
};

export const getAllTickets = async (): Promise<Ticket[]> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform to match our Ticket type
    return (data || []).map(ticket => ({
      id: ticket.id,
      user_id: ticket.user_id,
      subject: ticket.subject,
      message: ticket.message || '',
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
      priority: ticket.priority as 'low' | 'medium' | 'high',
      category: ticket.category || 'general', // Default to 'general' if category is missing
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
      ai_response: ticket.ai_response,
      ai_responded_at: ticket.ai_responded_at
    }));
  } catch (error) {
    console.error('Error fetching all tickets:', error);
    return [];
  }
};
