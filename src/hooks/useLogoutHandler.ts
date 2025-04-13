
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogoutHandler = (onSuccess?: () => void) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut();
    if (onSuccess) {
      onSuccess();
    }
    navigate('/');
  };
  
  return handleLogout;
};
