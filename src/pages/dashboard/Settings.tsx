
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, Bell, Shield, User } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChangePassword = async () => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Account Settings</h2>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-unicorn-darkPurple/50 border border-unicorn-gold/20">
          <TabsTrigger value="profile" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
              <CardDescription className="text-gray-400">Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="John Doe" 
                  className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={user?.email || ''} 
                  disabled 
                  className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                />
                <p className="text-xs text-gray-400">Contact support to change your email address</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (123) 456-7890" 
                  className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveProfile} 
                disabled={loading}
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader>
              <CardTitle className="text-white">Password</CardTitle>
              <CardDescription className="text-gray-400">Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  type="password" 
                  className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleChangePassword} 
                disabled={loading}
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
              >
                {loading ? 'Updating...' : 'Change Password'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-gray-400">Enhance your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Enable 2FA</Label>
                  <p className="text-sm text-gray-400">Secure your account with two-factor authentication</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-gray-400">Manage your notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Investment Updates</Label>
                  <p className="text-sm text-gray-400">Receive notifications about your investment performance</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Withdrawal Confirmations</Label>
                  <p className="text-sm text-gray-400">Get notified when a withdrawal is processed</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Promotional Offers</Label>
                  <p className="text-sm text-gray-400">Receive information about special offers and promotions</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Affiliate Rewards</Label>
                  <p className="text-sm text-gray-400">Get notified when you earn affiliate rewards</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveProfile} 
                disabled={loading}
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
              >
                {loading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
