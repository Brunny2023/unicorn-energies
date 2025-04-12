import { supabase } from "@/integrations/supabase/client";
import { Ticket } from "@/types/investment";
import { updateTicket } from "./api/updateTicket";

/**
 * Service to handle AI ticket analysis and automated responses
 */
export const AI_ASSISTANT_NAME = "Gilbert Henshow";

export const aiTicketService = {
  /**
   * Analyze a ticket and generate an AI response
   */
  async analyzeTicket(ticket: Ticket): Promise<{
    response: string;
    category?: string;
    priority?: string;
    suggestedNextSteps?: string[];
  }> {
    try {
      console.log("Analyzing ticket:", ticket.id);
      
      // Call the analyze-ticket edge function
      const { data, error } = await supabase.functions.invoke("analyze-ticket", {
        body: { ticket },
      });
      
      if (error) {
        console.error("Error calling analyze-ticket function:", error);
        throw new Error("Failed to analyze ticket");
      }
      
      return data;
    } catch (err) {
      console.error("Error in analyzeTicket:", err);
      return {
        response: "We apologize, but we're unable to process this ticket automatically at the moment. A human support agent will review your request shortly.",
      };
    }
  },
  
  /**
   * Auto-respond to a ticket using AI analysis
   */
  autoRespondToTicket: async (ticket: Ticket): Promise<boolean> => {
    if (!ticket || !ticket.id) {
      console.error("Invalid ticket provided for AI response");
      return false;
    }

    try {
      console.log(`${AI_ASSISTANT_NAME} AI is analyzing ticket:`, ticket.id);
      
      // Generate AI response
      const aiResponse = await aiTicketService.generateResponse(ticket);
      
      if (!aiResponse) {
        console.error("Failed to generate AI response");
        return false;
      }

      // Update the ticket with the AI response
      const success = await updateTicket(ticket.id, {
        ai_response: aiResponse,
        ai_responded_at: new Date().toISOString(),
        // Don't change the status if it's already resolved or closed
        status: ['resolved', 'closed'].includes(ticket.status) ? ticket.status : 'in_progress',
      });

      return success;
    } catch (error) {
      console.error("Error in AI ticket auto-response:", error);
      return false;
    }
  },

  /**
   * Generate an AI response for a ticket
   */
  generateResponse: async (ticket: Ticket): Promise<string> => {
    // This would ideally connect to an AI service, but for now we'll use sample responses
    // based on the ticket's content
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time

    const responses = [
      `Thank you for reaching out to UnicornEnergies support. I'm ${AI_ASSISTANT_NAME}, your AI assistant. I've reviewed your ticket regarding "${ticket.subject}" and I understand your concern. A member of our team will follow up with you shortly. In the meantime, you can check our FAQ section which might address your question.`,
      
      `Hello, I'm ${AI_ASSISTANT_NAME}, the AI assistant at UnicornEnergies. I've analyzed your inquiry about "${ticket.subject}". Based on your message, I recommend checking our documentation section on this topic. Our support team has been notified and will provide further assistance soon.`,
      
      `This is ${AI_ASSISTANT_NAME}, UnicornEnergies' AI support assistant. I've processed your request about "${ticket.subject}". We take these matters seriously and are working to resolve your issue. Our team will contact you within 24 hours with more information. Thank you for your patience.`,
      
      `Greetings from ${AI_ASSISTANT_NAME}, the AI support assistant at UnicornEnergies. I've received your ticket about "${ticket.subject}". I've flagged this for our specialized team who will provide you with a detailed response. In the meantime, please ensure your account details are up to date to expedite the process.`,
      
      `Hi there, ${AI_ASSISTANT_NAME} here from the UnicornEnergies support team. I've analyzed your inquiry about "${ticket.subject}" and have identified some potential solutions. Our human support team will reach out with specific instructions to resolve your issue. Thank you for your patience.`
    ];

    // Choose a response based on some characteristic of the ticket to ensure consistency
    const responseIndex = ticket.id.charCodeAt(0) % responses.length;
    return responses[responseIndex];
  },
  
  /**
   * Process all open tickets and generate AI responses
   */
  async processOpenTickets(): Promise<{
    processed: number;
    successful: number;
    failed: number;
  }> {
    try {
      console.log("Processing open tickets");
      
      // Get all open tickets
      const { data: openTickets, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("status", "open")
        .is("ai_response", null);
      
      if (error) {
        console.error("Error fetching open tickets:", error);
        throw error;
      }
      
      if (!openTickets || openTickets.length === 0) {
        console.log("No open tickets to process");
        return { processed: 0, successful: 0, failed: 0 };
      }
      
      console.log(`Found ${openTickets.length} open tickets to process`);
      
      // Process each ticket
      let successful = 0;
      let failed = 0;
      
      for (const ticket of openTickets) {
        try {
          const success = await this.autoRespondToTicket(ticket as Ticket);
          if (success) {
            successful++;
          } else {
            failed++;
          }
        } catch (err) {
          console.error(`Error processing ticket ${ticket.id}:`, err);
          failed++;
        }
      }
      
      return {
        processed: openTickets.length,
        successful,
        failed,
      };
    } catch (err) {
      console.error("Error in processOpenTickets:", err);
      return { processed: 0, successful: 0, failed: 0 };
    }
  },
};
