
import { Ticket } from '@/types/investment';

/**
 * Returns all available dummy tickets for development mode
 */
export const getAllDummyTickets = (): Ticket[] => {
  return [
    {
      id: "ticket-1",
      user_id: "dev-user-id",
      subject: "Withdrawal Issue",
      message: "I'm having trouble with my recent withdrawal...",
      status: "open",
      priority: "high",
      category: "withdrawal",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ticket-2",
      user_id: "dev-user-id",
      subject: "Investment Question",
      message: "Can you explain how the Gold plan works?",
      status: "closed",
      priority: "medium",
      category: "investment",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      ai_response: "The Gold plan offers a daily return of 0.5% for 30 days...",
      ai_responded_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "ticket-3",
      user_id: "dev-user-id",
      subject: "Account Verification",
      message: "I need to verify my account for larger withdrawals.",
      status: "in-progress",
      priority: "medium",
      category: "account",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];
};

/**
 * Returns dummy tickets specific to a user
 */
export const getDummyUserTickets = (userId: string): Ticket[] => {
  return [
    {
      id: "ticket-1",
      user_id: userId,
      subject: "Withdrawal Delay",
      message: "My withdrawal has been pending for 3 days. Can you please check the status?",
      status: "open",
      priority: "high",
      category: "withdrawal",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ticket-2",
      user_id: userId,
      subject: "Investment Plan Question",
      message: "I'd like to understand the difference between Goldfish and Dolphin plans.",
      status: "replied",
      priority: "medium",
      category: "investment",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      ai_response: "Thank you for your question about our investment plans. The Goldfish plan offers a 0.5% daily return for 30 days, while the Dolphin plan offers a 0.7% daily return for 45 days. The minimum investment for Goldfish is $100, while Dolphin starts at $500.",
      ai_responded_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "ticket-3",
      user_id: userId,
      subject: "Technical Issue with Dashboard",
      message: "The investment charts are not loading correctly on my account.",
      status: "closed",
      priority: "low",
      category: "technical",
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      ai_response: "We've resolved the issue with the investment charts on your dashboard. Please refresh your browser and clear your cache to see the updates. Let us know if you encounter any further issues.",
      ai_responded_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
    },
  ];
};
