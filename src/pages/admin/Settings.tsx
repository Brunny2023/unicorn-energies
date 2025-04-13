
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Server, Shield, Mail } from "lucide-react";

// Import the refactored component tabs
import SystemSettingsTab from "@/components/admin/settings/SystemSettingsTab";
import AISettingsTab from "@/components/admin/settings/AISettingsTab";
import SecuritySettingsTab from "@/components/admin/settings/SecuritySettingsTab";
import EmailTemplatesTab from "@/components/admin/settings/EmailTemplatesTab";

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
            <SystemSettingsTab 
              loading={loading}
              systemSettings={systemSettings}
              setSystemSettings={setSystemSettings}
              onSave={handleSaveSystemSettings}
            />
          </TabsContent>
          
          <TabsContent value="ai">
            <AISettingsTab 
              loading={loading}
              onSave={handleSaveAISettings}
            />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettingsTab />
          </TabsContent>
          
          <TabsContent value="emails">
            <EmailTemplatesTab />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
