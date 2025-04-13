
import { supabase } from '@/integrations/supabase/client';

// Function to send email via Supabase Edge Function
export const sendEmail = async (
  to: string, 
  subject: string, 
  htmlContent: string, 
  textContent?: string
): Promise<boolean> => {
  try {
    const response = await fetch('https://kcjshpoqlldwpfsellxt.supabase.co/functions/v1/send-notification-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabase.auth.getSession()}`
      },
      body: JSON.stringify({
        to,
        subject,
        html: htmlContent,
        text: textContent
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
