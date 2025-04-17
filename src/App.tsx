
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
    <Router>
      <AuthProvider>
        <PublicRoutes />
        <DashboardRoutes />
        <AdminRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
