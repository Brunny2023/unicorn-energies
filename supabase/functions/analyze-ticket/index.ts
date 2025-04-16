import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AI_ASSISTANT_NAME = "Gilbert Henshow";

const ticketCategories = [
  {
    category: "withdrawal",
    keywords: ["withdraw", "payout", "money"],
    priorityKeywords: ["urgent", "immediately", "emergency"],
    response: `Thank you for contacting Unicorn Energies support about your withdrawal request.
      Based on my analysis, I understand you're experiencing issues with withdrawing funds. Here's what you need to know:
      - Withdrawals are processed within 24-48 hours of request
      - A small fee of 0.5-2% may apply depending on your account tier
      - You must have sufficient accrued profits to make a withdrawal
      - Your account must be fully verified for withdrawals over $1,000`,
    suggestedNextSteps: [
      "Verify user's withdrawal eligibility",
      "Check transaction logs for any errors",
      "Confirm identity verification status",
    ],
  },
  // Add more categories similarly...
];

const categorizeTicket = (ticketContent) => {
  for (const categoryConfig of ticketCategories) {
    if (categoryConfig.keywords.some((keyword) => ticketContent.includes(keyword))) {
      const isHighPriority = categoryConfig.priorityKeywords?.some((keyword) =>
        ticketContent.includes(keyword)
      );
      return {
        category: categoryConfig.category,
        priority: isHighPriority ? "high" : "medium",
        response: categoryConfig.response,
        suggestedNextSteps: categoryConfig.suggestedNextSteps,
      };
    }
  }

  // Default response
  return {
    category: "general",
    priority: "medium",
    response: `Thank you for contacting Unicorn Energies support. We've received your inquiry and will get back to you shortly.`,
    suggestedNextSteps: ["Classify ticket manually", "Assign to appropriate department"],
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticket } = await req.json();

    if (!ticket || !ticket.subject || !ticket.message) {
      return new Response(
        JSON.stringify({ error: "Missing ticket information" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const ticketContent = `${ticket.subject.toLowerCase()} ${ticket.message.toLowerCase()}`;
    const { category, priority, response, suggestedNextSteps } = categorizeTicket(ticketContent);

    return new Response(
      JSON.stringify({
        response,
        category,
        priority,
        suggestedNextSteps,
        ticket_id: ticket.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error(`Error in ${AI_ASSISTANT_NAME} analyzing ticket:`, error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
