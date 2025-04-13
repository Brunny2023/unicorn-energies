
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useLogoutHandler = (onSuccess?: () => void) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await signOut();
      
      if (onSuccess) {
        onSuccess();
      }
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account"
      });
      
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return handleLogout;
};
