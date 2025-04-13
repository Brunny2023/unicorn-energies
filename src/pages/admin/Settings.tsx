import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Server, Shield, Mail, Users, Globe, Edit } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [systemSettings, setSystemSettings] = useState({
    maxWithdrawalAmount: 100000,
    minWithdrawalAmount: 100,
    withdrawalFeePercent: 2.5,
    allowRegistration: true,
    allowLoans: true,
    maintenanceMode: false,
  });
  
  const handleSaveSystemSettings = async () => {
    setLoading(true);
    try {
      // In a real app, this would save to the database
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "System settings updated",
        description: "The platform settings have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to update settings",
        description: "There was an error saving system settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveAISettings = async () => {
    setLoading(true);
    try {
      // In a real app, this would save to the database
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "AI settings updated",
        description: "AI assistant settings have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to update AI settings",
        description: "There was an error saving AI assistant settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const emailTemplates = [
    { id: "welcome", name: "Welcome Email", description: "Sent to new users after registration" },
    { id: "investment_confirmation", name: "Investment Confirmation", description: "Sent to users after making an investment" },
    { id: "withdrawal_confirmation", name: "Withdrawal Confirmation", description: "Sent to users after withdrawal request" },
    { id: "loan_status", name: "Loan Application Status", description: "Sent when loan application status changes" },
    { id: "password_reset", name: "Password Reset", description: "Sent to users when requesting password reset" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
            <p className="text-gray-400">Manage platform configuration and system settings</p>
          </div>
        </div>
        
        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="bg-unicorn-darkPurple/50 border border-unicorn-gold/20">
            <TabsTrigger 
              value="system" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <Server className="h-4 w-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="emails" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Templates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="system">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">Platform Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure global platform settings and limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minWithdrawal" className="text-white">Minimum Withdrawal ($)</Label>
                    <Input 
                      id="minWithdrawal" 
                      type="number"
                      value={systemSettings.minWithdrawalAmount}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings, 
                        minWithdrawalAmount: Number(e.target.value)
                      })}
                      min={1}
                      className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxWithdrawal" className="text-white">Maximum Withdrawal ($)</Label>
                    <Input 
                      id="maxWithdrawal" 
                      type="number"
                      value={systemSettings.maxWithdrawalAmount}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings, 
                        maxWithdrawalAmount: Number(e.target.value)
                      })}
                      min={100}
                      className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="withdrawalFee" className="text-white">Withdrawal Fee (%)</Label>
                    <Input 
                      id="withdrawalFee" 
                      type="number"
                      value={systemSettings.withdrawalFeePercent}
                      onChange={(e) => setSystemSettings({
                        ...systemSettings, 
                        withdrawalFeePercent: Number(e.target.value)
                      })}
                      min={0}
                      max={20}
                      step={0.1}
                      className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                    />
                  </div>
                </div>
                
                <Separator className="bg-unicorn-gold/20" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">User Registration</Label>
                      <p className="text-gray-400 text-sm">Allow new users to register on the platform</p>
                    </div>
                    <Switch 
                      checked={systemSettings.allowRegistration}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, allowRegistration: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Loan Applications</Label>
                      <p className="text-gray-400 text-sm">Allow users to apply for investment loans</p>
                    </div>
                    <Switch 
                      checked={systemSettings.allowLoans}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, allowLoans: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Maintenance Mode</Label>
                      <p className="text-gray-400 text-sm">Put the platform in maintenance mode (only admins can access)</p>
                    </div>
                    <Switch 
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, maintenanceMode: checked})
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                  onClick={handleSaveSystemSettings}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">AI Assistant Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure Gilbert Henshow AI assistant settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aiSystemPrompt" className="text-white">AI System Prompt</Label>
                  <Textarea 
                    id="aiSystemPrompt" 
                    rows={6}
                    defaultValue="You are Gilbert Henshow, an AI assistant for Unicorn Energies Investment platform. Your goal is to help users with their questions about investments, loan applications, and general platform usage. You should be knowledgeable about investment plans, profit calculations, and the platform's policies. Always be professional, helpful, and concise in your responses."
                    className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                  />
                  <p className="text-sm text-gray-400">This is the base instruction set for the AI assistant</p>
                </div>
                
                <Separator className="bg-unicorn-gold/20" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aiName" className="text-white">Assistant Name</Label>
                    <Input 
                      id="aiName" 
                      defaultValue="Gilbert Henshow"
                      className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="aiModel" className="text-white">AI Model</Label>
                    <Input 
                      id="aiModel" 
                      defaultValue="gpt-4o-mini"
                      className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                      disabled
                    />
                    <p className="text-xs text-gray-400">Contact support to change AI model</p>
                  </div>
                </div>
                
                <Separator className="bg-unicorn-gold/20" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Auto-Process New Tickets</Label>
                      <p className="text-gray-400 text-sm">Automatically process new support tickets with AI</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Auto-Resolve Simple Issues</Label>
                      <p className="text-gray-400 text-sm">Allow AI to automatically resolve simple support issues</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                  onClick={handleSaveAISettings}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save AI Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure platform security and access settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Require 2FA for Admins</Label>
                      <p className="text-gray-400 text-sm">Force all administrators to use two-factor authentication</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Force Password Reset</Label>
                      <p className="text-gray-400 text-sm">Require users to reset password every 90 days</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">CAPTCHA on Forms</Label>
                      <p className="text-gray-400 text-sm">Require CAPTCHA verification on all public forms</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
                
                <Separator className="bg-unicorn-gold/20" />
                
                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist" className="text-white">Admin IP Whitelist</Label>
                  <Textarea 
                    id="ipWhitelist" 
                    placeholder="Enter IP addresses separated by commas"
                    className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                  />
                  <p className="text-sm text-gray-400">Leave empty to allow admin access from any IP</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold">
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails">
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
                  Email templates use placeholders like {'{'}{'{'}}userName{'}'}{'}'} that will be automatically replaced with actual values when sending emails.
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
