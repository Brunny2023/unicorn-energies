import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts";

serve(async (req) => {
  try {
    // Parse the incoming JSON request
    const { captchaToken } = await req.json();

    // Validate the CAPTCHA token with Cloudflare Turnstile
    const secretKey = Deno.env.get("CAPTCHA_SECRET_KEY"); // Ensure this is set in your environment variables
    if (!captchaToken || !secretKey) {
      return new Response(
        JSON.stringify({ error: "Missing CAPTCHA token or secret key" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: captchaToken,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      return new Response(JSON.stringify({ error: "Invalid CAPTCHA" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // CAPTCHA is valid, proceed with the next step
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error validating CAPTCHA:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
