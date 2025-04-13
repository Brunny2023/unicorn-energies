
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { User, Bell, Lock, Shield, Mail } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Notification states
  const [notificationPrefs, setNotificationPrefs] = useState({
    interestPayments: true,
    loanUpdates: true,
    affiliateRewards: true,
    marketingEmails: false,
  });
  
  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      // In a real app, this would save to the database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to update notifications",
        description: "There was an error saving your notification preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSavePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      });
      
      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Password update failed",
        description: "There was an error updating your password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400">Manage your account preferences and security settings</p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="bg-unicorn-darkPurple/30 border border-unicorn-gold/20">
            <TabsTrigger 
              value="general" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <User className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          {/* General Tab */}
          <TabsContent value="general">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">Full Name</Label>
                    <Input 
                      id="fullName" 
                      placeholder="Your full name" 
                      defaultValue={user?.email?.split('@')[0] || ""}
                      className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={user?.email || ""}
                      disabled 
                      className="bg-unicorn-black/50 border-unicorn-gold/30 text-gray-400"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Your phone number" 
                    className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose which notifications you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification options */}
                <div className="space-y-4">
                  {/* Interest Payments */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Interest Payments</Label>
                      <p className="text-gray-400 text-sm">Receive notifications about interest payments</p>
                    </div>
                    <Switch 
                      checked={notificationPrefs.interestPayments}
                      onCheckedChange={(checked) => 
                        setNotificationPrefs({...notificationPrefs, interestPayments: checked})
                      }
                    />
                  </div>
                  
                  <Separator className="bg-unicorn-gold/20" />
                  
                  {/* Loan Updates */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Loan Updates</Label>
                      <p className="text-gray-400 text-sm">Notifications about loan applications and updates</p>
                    </div>
                    <Switch 
                      checked={notificationPrefs.loanUpdates}
                      onCheckedChange={(checked) => 
                        setNotificationPrefs({...notificationPrefs, loanUpdates: checked})
                      }
                    />
                  </div>
                  
                  <Separator className="bg-unicorn-gold/20" />
                  
                  {/* Affiliate Rewards */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Affiliate Rewards</Label>
                      <p className="text-gray-400 text-sm">Notifications about affiliate program rewards</p>
                    </div>
                    <Switch 
                      checked={notificationPrefs.affiliateRewards}
                      onCheckedChange={(checked) => 
                        setNotificationPrefs({...notificationPrefs, affiliateRewards: checked})
                      }
                    />
                  </div>
                  
                  <Separator className="bg-unicorn-gold/20" />
                  
                  {/* Marketing Emails */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Marketing Emails</Label>
                      <p className="text-gray-400 text-sm">Receive promotional emails and investment opportunities</p>
                    </div>
                    <Switch 
                      checked={notificationPrefs.marketingEmails}
                      onCheckedChange={(checked) => 
                        setNotificationPrefs({...notificationPrefs, marketingEmails: checked})
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                  onClick={handleSaveNotifications}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your password and account security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSavePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      placeholder="Enter your current password" 
                      className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-white">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        placeholder="Create a new password" 
                        className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                        required
                        minLength={8}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="Confirm your new password" 
                        className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
                
                <Separator className="bg-unicorn-gold/20" />
                
                <div>
                  <h3 className="text-white text-lg font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
                  <Button variant="outline" className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
