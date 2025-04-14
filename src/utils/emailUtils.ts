
import { EMAIL_TEMPLATES } from './email/emailTemplates';
import { renderTemplate } from './email/emailRenderer';
import { sendEmail } from './email/emailSender';

// Function to send welcome email
export const sendWelcomeEmail = async (
  email: string,
  userData: { userName: string }
): Promise<boolean> => {
  try {
    const template = EMAIL_TEMPLATES.welcome;
    const html = renderTemplate(template.html, userData);
    return await sendEmail(email, template.subject, html);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

// Function to send investment confirmation email
export const sendInvestmentConfirmationEmail = async (
  email: string,
  data: { 
    userName: string; 
    amount: number;
    planName: string;
    duration: number;
    expectedReturn: number;
  }
): Promise<boolean> => {
  try {
    const template = EMAIL_TEMPLATES.investment_confirmation;
    
    const formattedData = {
      userName: data.userName,
      amount: `$${data.amount.toFixed(2)}`,
      planName: data.planName,
      duration: data.duration,
      expectedReturn: data.expectedReturn
    };
    
    const html = renderTemplate(template.html, formattedData);
    return await sendEmail(email, template.subject, html);
  } catch (error) {
    console.error('Error sending investment confirmation email:', error);
    return false;
  }
};

// Function to send withdrawal confirmation email
export const sendWithdrawalConfirmationEmail = async (
  email: string,
  data: { 
    userName: string; 
    amount: number;
    method: string;
    destination: string;
    status: string;
  }
): Promise<boolean> => {
  try {
    const template = EMAIL_TEMPLATES.withdrawal_confirmation;
    
    const formattedData = {
      userName: data.userName,
      amount: `$${data.amount.toFixed(2)}`,
      method: data.method,
      destination: data.destination,
      status: data.status
    };
    
    const html = renderTemplate(template.html, formattedData);
    return await sendEmail(email, template.subject, html);
  } catch (error) {
    console.error('Error sending withdrawal confirmation email:', error);
    return false;
  }
};

// Function to send loan status email
export const sendLoanStatusEmail = async (
  email: string,
  data: { 
    userName: string; 
    amount: number;
    purpose: string;
    applicationDate: string;
    status: string;
    statusColor: string;
    statusMessage: string;
  }
): Promise<boolean> => {
  try {
    const template = EMAIL_TEMPLATES.loan_status;
    
    const formattedData = {
      userName: data.userName,
      amount: `$${data.amount.toFixed(2)}`,
      purpose: data.purpose,
      applicationDate: data.applicationDate,
      status: data.status,
      statusColor: data.statusColor,
      statusMessage: data.statusMessage
    };
    
    const html = renderTemplate(template.html, formattedData);
    return await sendEmail(email, template.subject, html);
  } catch (error) {
    console.error('Error sending loan status email:', error);
    return false;
  }
};

// Function to send password reset email
export const sendPasswordResetEmail = async (
  email: string,
  data: { 
    userName: string; 
    resetLink: string;
  }
): Promise<boolean> => {
  try {
    const template = EMAIL_TEMPLATES.password_reset;
    const html = renderTemplate(template.html, data);
    return await sendEmail(email, template.subject, html);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};
