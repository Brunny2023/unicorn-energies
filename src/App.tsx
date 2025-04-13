
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PublicRoutes from "./routes/PublicRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Auth context
import { AuthProvider } from "./contexts/AuthContext";

// Toaster
import { Toaster } from "@/components/ui/toaster";

// CSS and other assets
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <PublicRoutes />
        <DashboardRoutes />
        <AdminRoutes />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
