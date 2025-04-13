
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface SystemSettingsProps {
  loading: boolean;
  systemSettings: {
    maxWithdrawalAmount: number;
    minWithdrawalAmount: number;
    withdrawalFeePercent: number;
    allowRegistration: boolean;
    allowLoans: boolean;
    maintenanceMode: boolean;
  };
  setSystemSettings: React.Dispatch<React.SetStateAction<{
    maxWithdrawalAmount: number;
    minWithdrawalAmount: number;
    withdrawalFeePercent: number;
    allowRegistration: boolean;
    allowLoans: boolean;
    maintenanceMode: boolean;
  }>>;
  onSave: () => Promise<void>;
}

const SystemSettingsTab: React.FC<SystemSettingsProps> = ({ 
  loading, 
  systemSettings, 
  setSystemSettings, 
  onSave 
}) => {
  return (
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
          onClick={onSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SystemSettingsTab;
