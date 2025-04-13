
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const AI_ASSISTANT_NAME = "Gilbert Henshow";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { ticket } = await req.json()

    if (!ticket || !ticket.subject || !ticket.message) {
      return new Response(
        JSON.stringify({ error: 'Missing ticket information' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`${AI_ASSISTANT_NAME} generating response for ticket:`, ticket.subject)

    // Generate a response based on the ticket subject and content
    let response = ""
    
    // Basic keyword matching for different ticket types
    if (ticket.subject.toLowerCase().includes("withdraw") || ticket.message.toLowerCase().includes("withdraw")) {
      response = `Thank you for contacting our support team. I understand you're having an issue with withdrawals.\n\nTo process your withdrawal, please ensure:\n\n1. You have sufficient accrued profits in your account\n2. You're aware of the withdrawal fee which is calculated based on your account tier\n3. Withdrawals are processed within 24-48 hours\n\nIf you're still having issues, please provide your transaction ID and we'll investigate further.`
    } 
    else if (ticket.subject.toLowerCase().includes("investment") || ticket.message.toLowerCase().includes("invest")) {
      response = `Thank you for reaching out about your investment. I'd be happy to help.\n\nRegarding your investment inquiry:\n\n- All investments are processed immediately when confirmed\n- Daily returns are calculated at 00:00 UTC\n- Your investment will complete automatically at the end of its term\n\nIf you have specific questions about your returns or investment terms, please let us know.`
    }
    else if (ticket.subject.toLowerCase().includes("loan") || ticket.message.toLowerCase().includes("loan")) {
      response = `Thank you for your loan inquiry. Here's some important information about our loan policies:\n\n1. Loans are approved based on your proposed investment amount, with a maximum limit of 300% of your proposed investment\n2. Loan funds can only be used for investments and cannot be withdrawn directly\n3. You must invest at least 33.33% of your loan amount before you can withdraw any profits from loan-funded investments\n\nIf you have specific questions about your loan application, please provide more details.`
    }
    else if (ticket.subject.toLowerCase().includes("account") || ticket.message.toLowerCase().includes("account")) {
      response = `Thank you for contacting us about your account. Here's some helpful information:\n\n- Your account details can be updated in your profile settings\n- For security concerns, we recommend enabling two-factor authentication\n- Account statements are generated monthly and available in your dashboard\n\nIf you need further assistance with your account, please provide more specific details about your issue.`
    }
    else {
      response = `Thank you for contacting Unicorn Energies support. We've received your inquiry and I'm here to help.\n\nBased on your message, I understand your concern regarding "${ticket.subject}".\n\nOur team is reviewing your case and will provide personalized assistance shortly. In the meantime, you can check our FAQ section for similar issues and solutions.\n\nPlease feel free to provide any additional details that might help us resolve your issue more efficiently.`
    }

    return new Response(
      JSON.stringify({ 
        response,
        ticket_id: ticket.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error(`Error in ${AI_ASSISTANT_NAME} generating response:`, error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
