
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * Edge Function to analyze ticket content and generate appropriate response
 * This function uses a rule-based approach with keyword matching for different ticket types
 */
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

    console.log('Analyzing ticket:', ticket.subject)

    // Combine subject and message for better analysis
    const ticketContent = `${ticket.subject.toLowerCase()} ${ticket.message.toLowerCase()}`
    
    // Extract relevant keywords and categorize the ticket
    let category = 'general'
    let priority = ticket.priority || 'medium'
    let response = ""
    let suggestedNextSteps = []
    
    // Categorize based on content - this could be enhanced with AI models in future
    if (ticketContent.includes('withdraw') || 
        ticketContent.includes('payout') || 
        ticketContent.includes('money')) {
      category = 'withdrawal'
      
      // Determine priority based on urgency indicators
      if (ticketContent.includes('urgent') || 
          ticketContent.includes('immediately') || 
          ticketContent.includes('emergency')) {
        priority = 'high'
      }
      
      response = `Thank you for contacting Unicorn Energies support about your withdrawal request.

Based on our analysis, we understand you're experiencing issues with withdrawing funds. Here's what you need to know:

1. Withdrawals are processed within 24-48 hours of request
2. A small fee of 0.5-2% may apply depending on your account tier
3. You must have sufficient accrued profits to make a withdrawal
4. Your account must be fully verified for withdrawals over $1,000

Our system shows that your withdrawal request is being processed. If you've been waiting more than 48 hours, please provide your transaction ID, and we'll escalate this to our finance team.`

      suggestedNextSteps = [
        "Verify user's withdrawal eligibility",
        "Check transaction logs for any errors",
        "Confirm identity verification status"
      ]
    } 
    else if (ticketContent.includes('invest') || 
             ticketContent.includes('deposit') || 
             ticketContent.includes('portfolio')) {
      category = 'investment'
      
      response = `Thank you for reaching out about your investment with Unicorn Energies.

Our records indicate you have active investments with us. Here's important information about our investment process:

1. All investments are immediately processed upon confirmation
2. Daily returns are calculated at 00:00 UTC
3. Returns are automatically added to your accrued profits
4. Your investment will complete automatically at the end of its term

If you're considering making additional investments, our Gold Energy plan is currently offering the highest returns at 2.5% daily. Let us know if you'd like more information about our investment plans.`

      suggestedNextSteps = [
        "Review user's current investment portfolio",
        "Check for pending transactions",
        "Consider offering investment tier upgrade"
      ]
    }
    else if (ticketContent.includes('account') || 
             ticketContent.includes('login') || 
             ticketContent.includes('password') ||
             ticketContent.includes('verify')) {
      category = 'account'
      
      if (ticketContent.includes('hack') || 
          ticketContent.includes('stolen') || 
          ticketContent.includes('unauthorized')) {
        priority = 'high'
      }
      
      response = `Thank you for contacting us about your Unicorn Energies account.

Based on your message, here are some helpful points regarding account management:

1. Your account security is our top priority
2. You can update your profile details in the account settings
3. For security concerns, we recommend enabling two-factor authentication
4. Account statements are generated monthly and available in your dashboard

If you're experiencing login issues, you can use the 'Forgot Password' option on the login page. For security reasons, we never ask for your password via email or support tickets.`

      suggestedNextSteps = [
        "Check account security settings",
        "Verify user identity if needed",
        "Review recent account activity for anomalies"
      ]
    }
    else {
      // General category for everything else
      response = `Thank you for contacting Unicorn Energies support.

We've received your inquiry and are reviewing it. Our team is committed to providing you with personalized assistance shortly.

In the meantime, you might find helpful information in our FAQ section on the website, which addresses many common questions about our platform.

We appreciate your patience and will get back to you as soon as possible.

Unicorn Energies Support Team`

      suggestedNextSteps = [
        "Classify ticket manually",
        "Assign to appropriate department",
        "Consider following up within 24 hours"
      ]
    }

    return new Response(
      JSON.stringify({ 
        response,
        category,
        priority,
        suggestedNextSteps,
        ticket_id: ticket.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error analyzing ticket:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
