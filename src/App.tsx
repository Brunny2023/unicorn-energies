
import { useEffect } from "react";
import PublicRoutes from "@/routes/PublicRoutes";
import DashboardRoutes from "@/routes/DashboardRoutes";
import AdminRoutes from "@/routes/AdminRoutes";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { createSuperAdmin } from "@/utils/admin/createSuperAdmin";

function App() {
  useEffect(() => {
    // Attempt to create super admin account on app startup
    createSuperAdmin();
  }, []);

  return (
    <AuthProvider>
      <PublicRoutes />
      <DashboardRoutes />
      <AdminRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
