
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Shield, Bell, Server, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';

const AdminSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings updated",
        description: "Admin settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Admin Settings</h2>
        </div>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-unicorn-darkPurple/50 border border-unicorn-gold/20">
            <TabsTrigger value="general" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
              <SettingsIcon className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
              <Server className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">Platform Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure general platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Maintenance Mode</Label>
                    <p className="text-sm text-gray-400">Temporarily disable access to the platform</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">User Registration</Label>
                    <p className="text-sm text-gray-400">Allow new users to register</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportEmail" className="text-white">Support Email</Label>
                  <Input 
                    id="supportEmail" 
                    defaultValue="support@unicorn-energies.com" 
                    className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="withdrawalFee" className="text-white">Default Withdrawal Fee (%)</Label>
                  <Input 
                    id="withdrawalFee" 
                    type="number" 
                    defaultValue="5" 
                    min="0" 
                    max="20" 
                    className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={loading}
                  className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure platform security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-400">Require all admin users to use 2FA</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Login Rate Limiting</Label>
                    <p className="text-sm text-gray-400">Limit login attempts to prevent brute force attacks</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-white">Admin Session Timeout (minutes)</Label>
                  <Input 
                    id="sessionTimeout" 
                    type="number" 
                    defaultValue="30" 
                    min="5" 
                    className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy" className="text-white">Password Policy</Label>
                  <select 
                    id="passwordPolicy" 
                    className="w-full p-3 bg-unicorn-black/30 border border-unicorn-gold/30 rounded-md text-white"
                  >
                    <option value="standard">Standard (8+ chars, 1 uppercase, 1 number)</option>
                    <option value="strong">Strong (10+ chars, uppercase, number, symbol)</option>
                    <option value="very-strong">Very Strong (12+ chars, uppercase, number, symbol)</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={loading}
                  className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                >
                  {loading ? 'Saving...' : 'Save Security Settings'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">Admin Notification Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure admin notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">New User Registrations</Label>
                    <p className="text-sm text-gray-400">Get notified when new users register</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Large Withdrawals</Label>
                    <p className="text-sm text-gray-400">Get notified for withdrawals above a certain threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Support Tickets</Label>
                    <p className="text-sm text-gray-400">Get notified for new support tickets</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="largeWithdrawalThreshold" className="text-white">Large Withdrawal Threshold ($)</Label>
                  <Input 
                    id="largeWithdrawalThreshold" 
                    type="number" 
                    defaultValue="5000" 
                    className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={loading}
                  className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                >
                  {loading ? 'Saving...' : 'Save Notification Settings'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">AI Assistant Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure Gilbert Henshow, your AI support assistant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Enable AI Ticket Responses</Label>
                    <p className="text-sm text-gray-400">Allow Gilbert to automatically respond to support tickets</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Auto-Categorize Tickets</Label>
                    <p className="text-sm text-gray-400">Let Gilbert categorize tickets based on content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Auto-Prioritize Tickets</Label>
                    <p className="text-sm text-gray-400">Let Gilbert set ticket priority based on content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="aiResponseDelay" className="text-white">Response Delay (seconds)</Label>
                  <Input 
                    id="aiResponseDelay" 
                    type="number" 
                    defaultValue="60" 
                    min="0" 
                    className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                  />
                  <p className="text-xs text-gray-400">Allow time for human agents to respond first</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="aiRetrainSchedule" className="text-white">Retraining Schedule</Label>
                  <select 
                    id="aiRetrainSchedule" 
                    className="w-full p-3 bg-unicorn-black/30 border border-unicorn-gold/30 rounded-md text-white"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ticketTypes" className="text-white">Ticket Types to Handle</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="investment" defaultChecked className="rounded border-unicorn-gold/50" />
                      <Label htmlFor="investment" className="text-white">Investment Questions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="account" defaultChecked className="rounded border-unicorn-gold/50" />
                      <Label htmlFor="account" className="text-white">Account Issues</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="withdrawal" defaultChecked className="rounded border-unicorn-gold/50" />
                      <Label htmlFor="withdrawal" className="text-white">Withdrawal Requests</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="technical" defaultChecked className="rounded border-unicorn-gold/50" />
                      <Label htmlFor="technical" className="text-white">Technical Issues</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    toast({
                      title: "Process started",
                      description: "Processing all open tickets with Gilbert...",
                    });
                  }}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Process All Open Tickets Now
                </Button>
                
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={loading}
                  className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold w-full"
                >
                  {loading ? 'Saving...' : 'Save AI Assistant Settings'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
