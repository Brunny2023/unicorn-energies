
import { Ticket } from '@/types/investment';

// Create a set of dummy tickets for development
const dummyTickets: Ticket[] = [
  {
    id: 'ticket-001',
    user_id: 'user-123',
    subject: 'Withdrawal Pending',
    message: 'I requested a withdrawal 3 days ago but it still shows as pending. Could you please check?',
    status: 'open',
    priority: 'high',
    category: 'withdrawal',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ticket-002',
    user_id: 'user-123',
    subject: 'Investment Plan Question',
    message: 'Can you explain the difference between Gold and Platinum investment plans?',
    status: 'resolved',
    priority: 'medium',
    category: 'investment',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    ai_response: 'The Gold plan offers 10% return over 30 days while the Platinum plan offers 15% over 45 days. Platinum requires a higher minimum investment but provides better overall returns.',
    ai_responded_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ticket-003',
    user_id: 'user-123',
    subject: 'Account Verification',
    message: 'I uploaded my documents for verification yesterday. How long does the verification process usually take?',
    status: 'in-progress', // Fixed to use correct type
    priority: 'low',
    category: 'account',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    ai_response: 'We have received your documents and they are currently being reviewed. The verification process typically takes 1-2 business days.',
    ai_responded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ticket-004',
    user_id: 'user-456',
    subject: 'Login Issues',
    message: 'I cannot log in to my account. I keep getting an error message saying "Invalid credentials".',
    status: 'open',
    priority: 'high',
    category: 'technical',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ticket-005',
    user_id: 'user-789',
    subject: 'Referral Bonus',
    message: 'My friend signed up using my referral code but I did not receive my referral bonus.',
    status: 'open',
    priority: 'medium',
    category: 'general',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Gets all dummy tickets
 */
export const getAllDummyTickets = (): Ticket[] => {
  return [...dummyTickets];
};

/**
 * Gets dummy tickets for a specific user
 */
export const getDummyUserTickets = (userId: string): Ticket[] => {
  return dummyTickets.filter(ticket => ticket.user_id === userId);
};

/**
 * Gets a dummy ticket by ID
 */
export const getDummyTicketById = (ticketId: string): Ticket | null => {
  const ticket = dummyTickets.find(t => t.id === ticketId);
  return ticket || null;
};

/**
 * Creates a new dummy ticket
 */
export const getDummyTicket = (
  userId: string,
  subject: string,
  message: string,
  priority: string,
  category: string = 'general'
): Ticket => {
  const now = new Date().toISOString();
  
  return {
    id: `ticket-${Date.now()}`,
    user_id: userId,
    subject,
    message,
    status: 'open',
    priority: priority as 'low' | 'medium' | 'high',
    category,
    created_at: now,
    updated_at: now,
  };
};
