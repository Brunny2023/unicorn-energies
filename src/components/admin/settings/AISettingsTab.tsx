
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface AISettingsTabProps {
  loading: boolean;
  onSave: () => Promise<void>;
}

const AISettingsTab: React.FC<AISettingsTabProps> = ({ loading, onSave }) => {
  return (
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
          onClick={onSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save AI Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AISettingsTab;
