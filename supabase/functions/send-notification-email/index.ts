
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const body: EmailRequest = await req.json();
    
    if (!body.to || !body.subject || !body.html) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: to, subject, and html are required" 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400 
        }
      );
    }

    const { to, subject, html, text } = body;
    const from = body.from || "UnicornEnergies <notifications@unicornenergies.com>";

    console.log(`Sending email to: ${to}, subject: ${subject}`);
    
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text: text || undefined,
    });

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
