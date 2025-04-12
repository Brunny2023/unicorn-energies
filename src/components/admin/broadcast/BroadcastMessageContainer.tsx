
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BroadcastMessageContainer = () => {
  const { toast } = useToast();
  const [messageType, setMessageType] = useState<"all" | "active" | "inactive" | "custom">("all");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [customRecipients, setCustomRecipients] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subject for your message",
        variant: "destructive",
      });
      return;
    }
    
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to broadcast",
        variant: "destructive",
      });
      return;
    }
    
    if (messageType === "custom" && !customRecipients.trim()) {
      toast({
        title: "Error",
        description: "Please enter recipient email addresses",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      const targetDescription = 
        messageType === "all" ? "all users" :
        messageType === "active" ? "active users" :
        messageType === "inactive" ? "inactive users" :
        "selected recipients";
        
      toast({
        title: "Message Broadcast Sent",
        description: `Your message has been sent to ${targetDescription}.`,
      });
      
      // Reset form
      setMessage("");
      setSubject("");
      setCustomRecipients("");
      setIsSending(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Broadcast Messages</h2>
      </div>
      
      <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-unicorn-gold" />
            Send Broadcast Message
          </CardTitle>
          <CardDescription>
            Send important announcements to your users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendBroadcast} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Select 
                  onValueChange={(value: "all" | "active" | "inactive" | "custom") => setMessageType(value)}
                  defaultValue="all"
                >
                  <SelectTrigger className="bg-unicorn-darkPurple/30 border-unicorn-gold/20">
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                    <SelectItem value="custom">Custom Recipients</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {messageType === "custom" && (
                <div className="grid gap-2">
                  <Label htmlFor="customRecipients">Email Addresses (comma separated)</Label>
                  <Textarea
                    id="customRecipients"
                    placeholder="user1@example.com, user2@example.com"
                    className="min-h-[80px] bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                    value={customRecipients}
                    onChange={(e) => setCustomRecipients(e.target.value)}
                  />
                </div>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Message Subject"
                  className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here..."
                  className="min-h-[150px] bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                disabled={isSending}
              >
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Broadcast
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BroadcastMessageContainer;
