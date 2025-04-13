
import { supabase } from '@/integrations/supabase/client';
import { NotificationPreferences } from '@/types/investment';

// Fetch user notification preferences
export const getUserNotificationPreferences = async (userId: string): Promise<NotificationPreferences | null> => {
  try {
    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data as NotificationPreferences;
  } catch (error) {
    console.error('Error fetching user notification preferences:', error);
    return null;
  }
};

// Update user notification preferences
export const updateUserNotificationPreferences = async (
  userId: string,
  preferences: Partial<NotificationPreferences>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notification_preferences')
      .update({ 
        ...preferences,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating user notification preferences:', error);
    return false;
  }
};
