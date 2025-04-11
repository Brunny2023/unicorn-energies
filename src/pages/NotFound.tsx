
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import StarsBackground from "@/components/ui/StarsBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-unicorn-darkPurple/90">
      <StarsBackground />
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto text-center space-y-6 relative">
          <div className="absolute inset-0 rounded-2xl bg-unicorn-gold/10 blur-xl"></div>
          <div className="relative p-8 bg-unicorn-darkPurple/90 rounded-xl border border-unicorn-gold/30 shadow-2xl">
            <h1 className="text-6xl font-bold text-unicorn-gold mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
            <p className="text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20"
              >
                Go Back
              </Button>
              <Link to="/">
                <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
