
import { supabase } from "@/integrations/supabase/client";

// Check if a user is an admin
export const checkIfAdmin = async (userId: string): Promise<boolean> => {
  try {
    console.log("Checking admin status for user:", userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
    
    const isAdmin = data?.role === 'admin';
    console.log("Is admin?", isAdmin);
    return isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Create a new admin user (can only be done by existing admins)
export const createAdminUser = async (
  currentUserId: string,
  newAdminEmail: string,
  newAdminPassword: string,
  newAdminFullName: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // First check if current user is an admin
    const isAdmin = await checkIfAdmin(currentUserId);
    
    if (!isAdmin) {
      return { 
        success: false, 
        message: "Only administrators can create other admin accounts" 
      };
    }
    
    // Create the new user
    const { data, error } = await supabase.auth.admin.createUser({
      email: newAdminEmail,
      password: newAdminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: newAdminFullName
      }
    });
    
    if (error) {
      console.error("Error creating admin user:", error);
      return { 
        success: false, 
        message: error.message 
      };
    }
    
    if (!data.user) {
      return { 
        success: false, 
        message: "Failed to create user" 
      };
    }
    
    // Set the new user's role to admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', data.user.id);
    
    if (updateError) {
      console.error("Error setting admin role:", updateError);
      return { 
        success: false, 
        message: "User created but failed to set admin role: " + updateError.message 
      };
    }
    
    return { 
      success: true, 
      message: "Admin user created successfully" 
    };
  } catch (error: any) {
    console.error("Error in createAdminUser:", error);
    return { 
      success: false, 
      message: error.message || "Unknown error occurred" 
    };
  }
};

// Create the super admin account if it doesn't exist
export const initializeSuperAdmin = async (): Promise<void> => {
  try {
    const superAdminEmail = "GlobalUnicorns@unicorn-energies.com";
    
    // Check if super admin already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('email', superAdminEmail)
      .limit(1);
    
    if (checkError) {
      console.error("Error checking for super admin:", checkError);
      return;
    }
    
    // If super admin already exists, do nothing
    if (existingUsers && existingUsers.length > 0) {
      console.log("Super admin already exists");
      return;
    }
    
    // Create the super admin account
    const { data, error } = await supabase.auth.admin.createUser({
      email: superAdminEmail,
      password: "Flames@@77@",
      email_confirm: true,
      user_metadata: {
        full_name: "Global Unicorns Super Admin"
      }
    });
    
    if (error) {
      console.error("Error creating super admin:", error);
      return;
    }
    
    if (!data.user) {
      console.error("Failed to create super admin user");
      return;
    }
    
    // Set the super admin role
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', data.user.id);
    
    if (updateError) {
      console.error("Error setting super admin role:", updateError);
      return;
    }
    
    console.log("Super admin created successfully");
  } catch (error) {
    console.error("Error initializing super admin:", error);
  }
};
