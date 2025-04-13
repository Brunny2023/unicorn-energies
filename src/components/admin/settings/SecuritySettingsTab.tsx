
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const SecuritySettingsTab: React.FC = () => {
  return (
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
  );
};

export default SecuritySettingsTab;
