
import { supabase } from "@/integrations/supabase/client";

// Function to create a super admin account
export async function createSuperAdmin() {
  try {
    console.log("Attempting to create super admin account");
    
    // Check if the admin user already exists
    const { data: existingUsers } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('email', 'GlobalUnicorns@admin.com')
      .single();
    
    if (existingUsers) {
      console.log("Super admin already exists");
      return;
    }
    
    // Create new admin user
    const { data, error } = await supabase.auth.signUp({
      email: 'GlobalUnicorns@admin.com',
      password: 'Flames@@77@',
      options: {
        data: {
          full_name: 'GlobalUnicorns',
        },
      }
    });
    
    if (error) {
      console.error("Error creating super admin:", error);
      return;
    }
    
    if (data.user) {
      // Update the user's role to admin in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', data.user.id);
      
      if (profileError) {
        console.error("Error updating admin role:", profileError);
      } else {
        console.log("Super admin created successfully");
      }
    }
  } catch (error) {
    console.error("Error creating super admin:", error);
  }
}
