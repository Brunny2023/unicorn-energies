
import { supabase } from "@/integrations/supabase/client";
import { Ticket } from "@/types/investment";
import { updateTicket } from "./api/updateTicket";

/**
 * Service to handle AI ticket analysis and automated responses
 */
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
  async autoRespondToTicket(ticket: Ticket): Promise<boolean> {
    try {
      console.log("Auto-responding to ticket:", ticket.id);
      
      // Only auto-respond to open tickets
      if (ticket.status !== "open") {
        console.log("Skipping auto-response for non-open ticket");
        return false;
      }
      
      // Analyze the ticket
      const analysis = await this.analyzeTicket(ticket);
      
      if (!analysis.response) {
        console.error("No response generated for ticket:", ticket.id);
        return false;
      }
      
      // Prepare update data
      const updateData: Partial<Ticket> = {
        ai_response: analysis.response,
        status: "replied" as any,
        updated_at: new Date().toISOString(),
        ai_responded_at: new Date().toISOString(),
      };
      
      // Update priority if suggested
      if (analysis.priority && ticket.priority !== analysis.priority) {
        updateData.priority = analysis.priority as any;
      }
      
      // Update the ticket with AI response
      const success = await updateTicket(ticket.id, updateData);
      
      if (!success) {
        throw new Error("Failed to update ticket with AI response");
      }
      
      console.log("Successfully auto-responded to ticket:", ticket.id);
      return true;
    } catch (err) {
      console.error("Error in autoRespondToTicket:", err);
      return false;
    }
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
