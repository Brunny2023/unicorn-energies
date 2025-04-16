
import { Routes, Route, useEffect } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PublicRoutes from "./routes/PublicRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Auth context
import { AuthProvider } from "./contexts/AuthContext";
import { initializeSuperAdmin } from "./contexts/auth/actions/adminAction";

// Toaster
import { Toaster } from "@/components/ui/toaster";

// CSS and other assets
import "./App.css";

function App() {
  useEffect(() => {
    // Initialize super admin on app startup
    const setupSuperAdmin = async () => {
      try {
        await initializeSuperAdmin();
      } catch (error) {
        console.error("Failed to initialize super admin:", error);
      }
    };
    
    setupSuperAdmin();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
