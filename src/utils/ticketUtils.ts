
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types/investment';

export const createSupportTicket = async (userId: string, subject: string, message: string, priority: string, category: string = 'general'): Promise<Ticket | null> => {
  try {
    console.log('Creating support ticket:', { userId, subject, message, priority, category });
    
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

    // Transform to match our Ticket type
    return {
      id: data.id,
      user_id: data.user_id,
      subject: data.subject,
      message: data.message || '',
      status: data.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
      priority: data.priority as 'low' | 'medium' | 'high',
      category: category || determineCategory(data), // Use the input category or determine it
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
    console.log('Fetching tickets for user:', userId);
    
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

    // Transform to match our Ticket type, ensuring category is always populated
    return (data || []).map(ticket => ({
      id: ticket.id,
      user_id: ticket.user_id,
      subject: ticket.subject,
      message: ticket.message || '',
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
      priority: ticket.priority as 'low' | 'medium' | 'high',
      category: determineCategory(ticket), // Add category detection
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
    console.log('Fetching ticket details for ID:', ticketId);
    
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
    
    // Transform to match our Ticket type
    return {
      id: data.id,
      user_id: data.user_id,
      subject: data.subject,
      message: data.message || '',
      status: data.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
      priority: data.priority as 'low' | 'medium' | 'high',
      category: determineCategory(data), // Add category detection
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
    console.log('Updating ticket:', ticketId, updateData);
    
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

export const getAllTickets = async (): Promise<Ticket[]> => {
  try {
    console.log('Fetching all tickets');
    
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
    return (data || []).map(ticket => ({
      id: ticket.id,
      user_id: ticket.user_id,
      subject: ticket.subject,
      message: ticket.message || '',
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
      priority: ticket.priority as 'low' | 'medium' | 'high',
      category: determineCategory(ticket), // Add category detection
      created_at: ticket.created_at,
      updated_at: ticket.updated_at, // Fixed: using ticket.updated_at instead of data.updated_at
      ai_response: ticket.ai_response,
      ai_responded_at: ticket.ai_responded_at
    }));
  } catch (error) {
    console.error('Error fetching all tickets:', error);
    return [];
  }
};

// Helper function to determine the category based on ticket content
function determineCategory(ticket: any): string {
  // Detect category from subject or message content
  const text = (ticket.subject + ' ' + (ticket.message || '')).toLowerCase();
  
  if (text.includes('withdraw') || text.includes('payment')) {
    return 'withdrawal';
  } else if (text.includes('invest') || text.includes('plan') || text.includes('return')) {
    return 'investment';
  } else if (text.includes('account') || text.includes('profile') || text.includes('verify')) {
    return 'account';
  } else if (text.includes('technical') || text.includes('error') || text.includes('bug')) {
    return 'technical';
  }
  
  // Default category
  return 'general';
}
