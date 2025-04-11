import { Ticket } from '@/types/investment';

/**
 * Transforms raw ticket data from the database to our Ticket type
 */
export const transformTicketData = (ticket: any, providedCategory?: string): Ticket => {
  return {
    id: ticket.id,
    user_id: ticket.user_id,
    subject: ticket.subject,
    message: ticket.message || '',
    status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied',
    priority: ticket.priority as 'low' | 'medium' | 'high',
    category: providedCategory || determineCategory(ticket),
    created_at: ticket.created_at,
    updated_at: ticket.updated_at,
    ai_response: ticket.ai_response,
    ai_responded_at: ticket.ai_responded_at
  };
};

/**
 * Determines the category of a ticket based on its content
 */
export const determineCategory = (ticket: any): string => {
  // If the ticket already has a category, use it
  if (ticket.category) {
    return ticket.category;
  }
  
  // Otherwise detect category from subject or message content
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
};
