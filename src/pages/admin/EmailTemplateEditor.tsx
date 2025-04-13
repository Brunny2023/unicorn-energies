
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Email template types and their default content
const EMAIL_TEMPLATES = {
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
          <p style="margin: 0; font-size: 18px;">Investment Amount: <strong>${{amount}}</strong></p>
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
          <p style="margin: 0; font-size: 18px;">Withdrawal Amount: <strong>${{amount}}</strong></p>
          <p style="margin: 5px 0 0 0;">Withdrawal Method: <strong>{{method}}</strong></p>
          <p style="margin: 5px 0 0 0;">Withdrawal Destination: <strong>{{destination}}</strong></p>
          <p style="margin: 5px 0 0 0;">Status: <strong>{{status}}</strong></p>
        </div>
        <p>Your withdrawal is being processed and will be sent to your specified {{method}} within 1-3 business days, depending on your withdrawal method.</p>
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
        <div style="background-color: #f8f9fa; border-left: 4px solid #{{statusColor}}; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px;">Loan Amount: <strong>${{amount}}</strong></p>
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
        <p>We received a request to reset your password for your UnicornEnergies account. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, click the button below. This link will expire in 30 minutes for security reasons.</p>
        <a href="{{resetLink}}" style="display: inline-block; background-color: #8a6d3b; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px; margin-bottom: 15px;">Reset Your Password</a>
        <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; font-size: 14px;">{{resetLink}}</p>
        <p style="margin-top: 30px;">For security reasons, this password reset link will expire in 30 minutes. If you need to reset your password after that time, please submit a new password reset request.</p>
        <p>Best regards,<br>The UnicornEnergies Team</p>
        <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `
  },
};

const EmailTemplateEditor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const template = EMAIL_TEMPLATES[templateId as keyof typeof EMAIL_TEMPLATES];
  
  const [emailData, setEmailData] = useState({
    subject: template?.subject || "",
    html: template?.html || "",
  });
  
  const handleChange = (field: string, value: string) => {
    setEmailData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = async () => {
    try {
      // In a real app, this would save to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Template updated",
        description: `The ${template?.name} template has been saved successfully.`,
      });
      
      navigate("/admin/settings", { replace: true });
    } catch (error) {
      toast({
        title: "Failed to save template",
        description: "There was an error saving the email template.",
        variant: "destructive",
      });
    }
  };
  
  if (!template) {
    return (
      <AdminLayout>
        <div className="p-4 bg-unicorn-darkPurple/50 rounded-md">
          <h1 className="text-xl text-white">Template not found</h1>
          <Button 
            className="mt-4" 
            onClick={() => navigate("/admin/settings")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
        </div>
      </AdminLayout>
    );
  }
  
  // Get the available placeholders based on template type
  const getPlaceholders = () => {
    switch(templateId) {
      case 'welcome':
        return ['userName'];
      case 'investment_confirmation':
        return ['userName', 'amount', 'planName', 'duration', 'expectedReturn'];
      case 'withdrawal_confirmation':
        return ['userName', 'amount', 'method', 'destination', 'status'];
      case 'loan_status':
        return ['userName', 'amount', 'purpose', 'applicationDate', 'status', 'statusColor', 'statusMessage'];
      case 'password_reset':
        return ['userName', 'resetLink'];
      default:
        return [];
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Email Template</h1>
            <p className="text-gray-400">{template.name}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/settings")}
            className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-white">Template Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-white">Email Subject</label>
              <Input
                id="subject"
                value={emailData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="htmlContent" className="text-white">HTML Content</label>
              <div className="text-sm text-gray-400 mb-2">
                Available placeholders: {getPlaceholders().map(placeholder => (
                  <span key={placeholder} className="inline-block bg-unicorn-black/50 px-2 py-1 rounded mr-1 mb-1">
                    {`{{${placeholder}}}`}
                  </span>
                ))}
              </div>
              <Textarea
                id="htmlContent"
                value={emailData.html}
                onChange={(e) => handleChange("html", e.target.value)}
                className="min-h-[400px] bg-unicorn-black/30 border-unicorn-gold/30 text-white font-mono text-sm"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EmailTemplateEditor;
