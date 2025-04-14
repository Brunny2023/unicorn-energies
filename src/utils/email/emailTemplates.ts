// Define the email template types
export interface EmailTemplateType {
  name: string;
  subject: string;
  html: string;
}

// Email template collection
export const EMAIL_TEMPLATES: Record<string, EmailTemplateType> = {
  welcome: {
    name: "Welcome Email",
    subject: "Welcome to UnicornEnergies - Your Investment Journey Begins!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h1 style="color: #8a6d3b; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">Welcome to UnicornEnergies!</h1>
        <p>Hello {{userName}},</p>
        <p>We're excited to welcome you to UnicornEnergies, your trusted partner in sustainable energy investments!</p>
        <p>Your account has been successfully created and is now ready for use. With UnicornEnergies, you can:</p>
        <ul style="list-style-type: none; padding-left: 0;">
          <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
            <span style="position: absolute; left: 0; color: #8a6d3b;">✓</span> Invest in sustainable energy projects
          </li>
          <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
            <span style="position: absolute; left: 0; color: #8a6d3b;">✓</span> Apply for investment loans
          </li>
          <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
            <span style="position: absolute; left: 0; color: #8a6d3b;">✓</span> Track your investment performance
          </li>
          <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
            <span style="position: absolute; left: 0; color: #8a6d3b;">✓</span> Earn attractive returns on your capital
          </li>
        </ul>
        <p>To get started, simply log in to your dashboard and explore our investment plans.</p>
        <a href="https://unicornenergies.com/dashboard" style="display: inline-block; background-color: #8a6d3b; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px;">Access Your Dashboard</a>
        <p style="margin-top: 30px;">If you have any questions, our support team is always ready to assist you.</p>
        <p>Best regards,<br>The UnicornEnergies Team</p>
        <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `
  },

  investment_confirmation: {
    name: "Investment Confirmation",
    subject: "Investment Confirmation - Your UnicornEnergies Investment",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h1 style="color: #8a6d3b; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">Investment Confirmation</h1>
        <p>Hello {{userName}},</p>
        <p>Thank you for your investment with UnicornEnergies! We're pleased to confirm that your investment has been successfully processed.</p>
        <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px;">Investment Amount: <strong>{{amount}}</strong></p>
          <p style="margin: 5px 0 0 0;">Plan: <strong>{{planName}}</strong></p>
          <p style="margin: 5px 0 0 0;">Duration: <strong>{{duration}} days</strong></p>
          <p style="margin: 5px 0 0 0;">Expected Return: <strong>{{expectedReturn}}%</strong></p>
        </div>
        <p>Your investment will start generating returns according to the chosen plan. You can track your investment performance in your dashboard.</p>
        <a href="https://unicornenergies.com/dashboard/investments" style="display: inline-block; background-color: #8a6d3b; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px;">View Your Investments</a>
        <p style="margin-top: 30px;">Thank you for choosing UnicornEnergies for your investment needs.</p>
        <p>Best regards,<br>The UnicornEnergies Team</p>
        <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `
  },

  withdrawal_confirmation: {
    name: "Withdrawal Confirmation",
    subject: "Withdrawal Request Confirmation - UnicornEnergies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h1 style="color: #8a6d3b; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">Withdrawal Request Received</h1>
        <p>Hello {{userName}},</p>
        <p>We've received your withdrawal request and are processing it now.</p>
        <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px;">Withdrawal Amount: <strong>{{amount}}</strong></p>
          <p style="margin: 5px 0 0 0;">Withdrawal Method: <strong>{{method}}</strong></p>
          <p style="margin: 5px 0 0 0;">Withdrawal Destination: <strong>{{destination}}</strong></p>
          <p style="margin: 5px 0 0 0;">Status: <strong>{{status}}</strong></p>
        </div>
        <p>Your withdrawal is being processed and will be sent to your specified {{method}} within 1–3 business days, depending on your withdrawal method.</p>
        <p>You'll receive another email once your withdrawal has been completed.</p>
        <a href="https://unicornenergies.com/dashboard/withdraw" style="display: inline-block; background-color: #8a6d3b; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px;">View Withdrawal Status</a>
        <p style="margin-top: 30px;">Thank you for your trust in UnicornEnergies.</p>
        <p>Best regards,<br>The UnicornEnergies Team</p>
        <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `
  },

  loan_status: {
    name: "Loan Application Status",
    subject: "Loan Application Update - UnicornEnergies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h1 style="color: #8a6d3b; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">Loan Application Update</h1>
        <p>Hello {{userName}},</p>
        <p>We're writing to inform you about an update to your loan application with UnicornEnergies.</p>
        <div style="background-color: #f8f9fa; border-left: 4px solid {{statusColor}}; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px;">Loan Amount: <strong>{{amount}}</strong></p>
          <p style="margin: 5px 0 0 0;">Loan Purpose: <strong>{{purpose}}</strong></p>
          <p style="margin: 5px 0 0 0;">Application Date: <strong>{{applicationDate}}</strong></p>
          <p style="margin: 5px 0 0 0;">Status: <strong>{{status}}</strong></p>
        </div>
        <p>{{statusMessage}}</p>
        <a href="https://unicornenergies.com/dashboard/loans" style="display: inline-block; background-color: #8a6d3b; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px;">View Loan Details</a>
        <p style="margin-top: 30px;">Thank you for choosing UnicornEnergies.</p>
        <p>Best regards,<br>The UnicornEnergies Team</p>
        <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `
  },

  password_reset: {
    name: "Password Reset",
    subject: "Password Reset Request - UnicornEnergies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h1 style="color: #8a6d3b; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">Password Reset Request</h1>
        <p>Hello {{userName}},</p>
        <p>We received a request to reset your password for your UnicornEnergies account. If you didn’t make this request, you can safely ignore this email.</p>
        <p>Otherwise, click the button below to reset your password:</p>
        <a href="{{resetLink}}" style="display: inline-block; background-color: #8a6d3b; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px;">Reset Password</a>
        <p style="margin-top: 20px;">This link will expire in 1 hour for your security.</p>
        <p>Best regards,<br>The UnicornEnergies Team</p>
        <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `
  }
};

export const getPlaceholders = (templateId: string): string[] => {
  const template = EMAIL_TEMPLATES[templateId as keyof typeof EMAIL_TEMPLATES];
  if (!template) {
    return [];
  }
  const matches = template.html.matchAll(/\{\{(\w+)\}\}/g);
  const placeholders = new Set<string>();
  for (const match of matches) {
    placeholders.add(match[1]);
  }
  return Array.from(placeholders);
};