
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface EmailTemplateType {
  id: string;
  name: string;
  description: string;
}

const EmailTemplatesTab: React.FC = () => {
  const emailTemplates: EmailTemplateType[] = [
    { id: "welcome", name: "Welcome Email", description: "Sent to new users after registration" },
    { id: "investment_confirmation", name: "Investment Confirmation", description: "Sent to users after making an investment" },
    { id: "withdrawal_confirmation", name: "Withdrawal Confirmation", description: "Sent to users after withdrawal request" },
    { id: "loan_status", name: "Loan Application Status", description: "Sent when loan application status changes" },
    { id: "password_reset", name: "Password Reset", description: "Sent to users when requesting password reset" },
  ];

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Email Templates</CardTitle>
        <CardDescription className="text-gray-400">
          Manage system email templates sent to users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {emailTemplates.map((template) => (
            <div key={template.id} className="bg-unicorn-black/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{template.name}</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
                  asChild
                >
                  <Link to={`/admin/settings/email-templates/${template.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-400">{template.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-gray-400 italic">
          Email templates use placeholders like &#123;&#123; userName &#125;&#125; that will be automatically replaced with actual values when sending emails.
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmailTemplatesTab;
