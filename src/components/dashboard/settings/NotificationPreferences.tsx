
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { NotificationPreferences as NotifPrefs } from "@/types/investment";
import { getUserNotificationPreferences, updateUserNotificationPreferences } from "@/utils/notificationUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BellRing, Save, Loader } from "lucide-react";

const NotificationPreferences = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<NotifPrefs | null>(null);
  const [formValues, setFormValues] = useState({
    interest_payments: true,
    loan_updates: true,
    affiliate_rewards: true
  });

  useEffect(() => {
    if (user?.id) {
      fetchPreferences();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPreferences = async () => {
    setLoading(true);
    try {
      const data = await getUserNotificationPreferences(user?.id || '');
      setPreferences(data);
      
      if (data) {
        setFormValues({
          interest_payments: data.interest_payments,
          loan_updates: data.loan_updates,
          affiliate_rewards: data.affiliate_rewards
        });
      }
    } catch (error) {
      console.error("Error fetching notification preferences:", error);
      toast({
        title: "Error",
        description: "Failed to load notification preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (field: keyof typeof formValues) => {
    setFormValues(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = async () => {
    if (!user?.id) return;
    
    setSaving(true);
    try {
      const success = await updateUserNotificationPreferences(user.id, formValues);
      
      if (success) {
        toast({
          title: "Preferences Updated",
          description: "Your notification preferences have been saved",
        });
      } else {
        throw new Error("Failed to update preferences");
      }
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      toast({
        title: "Update Failed",
        description: "There was an error saving your preferences",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <BellRing className="h-5 w-5 mr-2 text-unicorn-gold" />
          Email Notification Settings
        </CardTitle>
        <CardDescription className="text-gray-400">
          Choose which types of notifications you'd like to receive via email
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-white font-medium">Interest Payments</h3>
                <p className="text-gray-400 text-sm">Receive notifications when interest is credited to your account</p>
              </div>
              <Switch
                checked={formValues.interest_payments}
                onCheckedChange={() => handleToggle('interest_payments')}
                disabled={saving}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-white font-medium">Loan Updates</h3>
                <p className="text-gray-400 text-sm">Receive notifications about your loan application status</p>
              </div>
              <Switch
                checked={formValues.loan_updates}
                onCheckedChange={() => handleToggle('loan_updates')}
                disabled={saving}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-white font-medium">Affiliate Rewards</h3>
                <p className="text-gray-400 text-sm">Receive notifications when you earn affiliate rewards</p>
              </div>
              <Switch
                checked={formValues.affiliate_rewards}
                onCheckedChange={() => handleToggle('affiliate_rewards')}
                disabled={saving}
              />
            </div>
            
            <div className="pt-4">
              <Button
                onClick={handleSave}
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationPreferences;
