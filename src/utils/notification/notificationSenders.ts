
import { supabase } from '@/integrations/supabase/client';
import { getUserNotificationPreferences } from './notificationPreferences';
import { sendEmail } from '../email/emailSender';
import { renderTemplate } from '../email/emailRenderer';

// Helper function to get user email and name
const getUserEmailAndName = async (userId: string): Promise<{ email: string, userName: string } | null> => {
  try {
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single();

    if (userError) throw userError;
    
    return {
      email: userData.email,
      userName: userData.full_name || userData.email
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// Send interest payment notification
export const sendInterestPaymentNotification = async (
  userId: string, 
  amount: number, 
  investmentId: string
): Promise<boolean> => {
  try {
    // Check if user has interest payment notifications enabled
    const preferences = await getUserNotificationPreferences(userId);
    if (!preferences || !preferences.interest_payments) {
      return false;
    }

    // Get user email and name
    const userData = await getUserEmailAndName(userId);
    if (!userData) return false;
    
    // Send email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h1 style="color: #8a6d3b; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">Interest Payment Notification</h1>
        <p>Hello ${userData.userName},</p>
        <p>We're pleased to inform you that an interest payment has been credited to your account.</p>
        <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px;">Amount: <strong>$${amount.toFixed(2)}</strong></p>
        </div>
        <p>This payment has been added to your account balance and is available for withdrawal or reinvestment.</p>
        <p>Thank you for investing with UnicornEnergies.</p>
        <a href="https://unicornenergies.com/dashboard" style="display: inline-block; background-color: #8a6d3b; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px;">View Your Dashboard</a>
        <p style="margin-top: 30px; font-size: 12px; color: #777;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `;

    const textContent = `
Interest Payment Notification

Hello ${userData.userName},

We're pleased to inform you that an interest payment has been credited to your account.

Amount: $${amount.toFixed(2)}

This payment has been added to your account balance and is available for withdrawal or reinvestment.

Thank you for investing with UnicornEnergies.

View your dashboard: https://unicornenergies.com/dashboard

This is an automated message. Please do not reply to this email.
    `;

    return await sendEmail(
      userData.email,
      'Interest Payment Notification - UnicornEnergies',
      htmlContent,
      textContent
    );
  } catch (error) {
    console.error('Error sending interest payment notification:', error);
    return false;
  }
};

// Send loan status notification
export const sendLoanStatusNotification = async (
  userId: string, 
  loanId: string, 
  status: 'approved' | 'rejected', 
  amount?: number, 
  adminNotes?: string
): Promise<boolean> => {
  try {
    // Check if user has loan update notifications enabled
    const preferences = await getUserNotificationPreferences(userId);
    if (!preferences || !preferences.loan_updates) {
      return false;
    }

    // Get user email and name
    const userData = await getUserEmailAndName(userId);
    if (!userData) return false;
    
    // Create email content based on status
    let subject, html, text;
    
    if (status === 'approved') {
      subject = 'Loan Application Approved - UnicornEnergies';
      
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #28a745; border-bottom: 2px solid #28a745; padding-bottom: 10px;">Loan Application Approved!</h1>
          <p>Hello ${userData.userName},</p>
          <p>We're pleased to inform you that your loan application has been approved.</p>
          <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 18px;">Loan Amount: <strong>$${amount?.toFixed(2)}</strong></p>
          </div>
          <p>The funds have been added to your account balance and are available for investment.</p>
          ${adminNotes ? `<p><strong>Admin Notes:</strong> ${adminNotes}</p>` : ''}
          <p>Thank you for choosing UnicornEnergies for your investment needs.</p>
          <a href="https://unicornenergies.com/dashboard" style="display: inline-block; background-color: #28a745; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px;">View Your Dashboard</a>
          <p style="margin-top: 30px; font-size: 12px; color: #777;">This is an automated message. Please do not reply to this email.</p>
        </div>
      `;

      text = `
Loan Application Approved!

Hello ${userData.userName},

We're pleased to inform you that your loan application has been approved.

Loan Amount: $${amount?.toFixed(2)}

The funds have been added to your account balance and are available for investment.

${adminNotes ? `Admin Notes: ${adminNotes}` : ''}

Thank you for choosing UnicornEnergies for your investment needs.

View your dashboard: https://unicornenergies.com/dashboard

This is an automated message. Please do not reply to this email.
      `;
    } else {
      subject = 'Loan Application Status Update - UnicornEnergies';
      
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #dc3545; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">Loan Application Update</h1>
          <p>Hello ${userData.userName},</p>
          <p>We regret to inform you that your loan application has been declined.</p>
          ${adminNotes ? `<p><strong>Reason:</strong> ${adminNotes}</p>` : ''}
          <p>You are welcome to submit a new application with revised terms or contact our support team for assistance.</p>
          <a href="https://unicornenergies.com/dashboard/loans/new" style="display: inline-block; background-color: #0d6efd; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px;">Apply Again</a>
          <p style="margin-top: 30px; font-size: 12px; color: #777;">This is an automated message. Please do not reply to this email.</p>
        </div>
      `;

      text = `
Loan Application Update

Hello ${userData.userName},

We regret to inform you that your loan application has been declined.

${adminNotes ? `Reason: ${adminNotes}` : ''}

You are welcome to submit a new application with revised terms or contact our support team for assistance.

Apply again: https://unicornenergies.com/dashboard/loans/new

This is an automated message. Please do not reply to this email.
      `;
    }

    return await sendEmail(
      userData.email,
      subject,
      html,
      text
    );
  } catch (error) {
    console.error('Error sending loan status notification:', error);
    return false;
  }
};

// Send affiliate reward notification
export const sendAffiliateRewardNotification = async (
  userId: string, 
  amount: number, 
  level: number
): Promise<boolean> => {
  try {
    // Check if user has affiliate reward notifications enabled
    const preferences = await getUserNotificationPreferences(userId);
    if (!preferences || !preferences.affiliate_rewards) {
      return false;
    }

    // Get user email and name
    const userData = await getUserEmailAndName(userId);
    if (!userData) return false;
    
    // Send email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h1 style="color: #8a6d3b; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">Affiliate Reward Notification</h1>
        <p>Hello ${userData.userName},</p>
        <p>Great news! You've earned an affiliate reward from your referral network.</p>
        <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px;">Reward Amount: <strong>$${amount.toFixed(2)}</strong></p>
          <p style="margin: 5px 0 0 0;">Level: ${level} referral</p>
        </div>
        <p>This reward has been added to your account balance and is available for withdrawal or reinvestment.</p>
        <p>Keep sharing your referral link to earn more rewards!</p>
        <a href="https://unicornenergies.com/dashboard" style="display: inline-block; background-color: #8a6d3b; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px;">View Your Dashboard</a>
        <p style="margin-top: 30px; font-size: 12px; color: #777;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `;

    const textContent = `
Affiliate Reward Notification

Hello ${userData.userName},

Great news! You've earned an affiliate reward from your referral network.

Reward Amount: $${amount.toFixed(2)}
Level: ${level} referral

This reward has been added to your account balance and is available for withdrawal or reinvestment.

Keep sharing your referral link to earn more rewards!

View your dashboard: https://unicornenergies.com/dashboard

This is an automated message. Please do not reply to this email.
    `;

    return await sendEmail(
      userData.email,
      'Affiliate Reward Notification - UnicornEnergies',
      htmlContent,
      textContent
    );
  } catch (error) {
    console.error('Error sending affiliate reward notification:', error);
    return false;
  }
};
