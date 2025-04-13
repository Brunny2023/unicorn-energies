
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EMAIL_TEMPLATES, getPlaceholders } from "@/utils/email/emailTemplates";

const EmailTemplateEditor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const template = templateId ? EMAIL_TEMPLATES[templateId as keyof typeof EMAIL_TEMPLATES] : undefined;
  
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
  
  if (!template || !templateId) {
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
  
  // Get the available placeholders based on the template type
  const placeholders = getPlaceholders(templateId);
  
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
                Available placeholders: {placeholders.map(placeholder => (
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
