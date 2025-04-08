import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface CaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
}

const Captcha = ({ siteKey, onVerify }: CaptchaProps) => {
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load the Cloudflare Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setLoaded(true);
    };
    
    script.onerror = () => {
      setError('Failed to load CAPTCHA. Please try again later.');
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
      
      // Reset widget if it exists
      if (widgetId && window.turnstile) {
        window.turnstile.reset(widgetId);
      }
    };
  }, []);
  
  useEffect(() => {
    if (loaded && window.turnstile) {
      try {
        // Render the CAPTCHA
        const id = window.turnstile.render('#captcha-container', {
          sitekey: siteKey,
          callback: (token: string) => {
            setError(null);
            onVerify(token);
          },
          'error-callback': () => {
            setError('CAPTCHA verification failed. Please try again.');
          },
          'expired-callback': () => {
            setError('CAPTCHA expired. Please refresh and try again.');
          }
        });
        
        setWidgetId(id);
      } catch (err) {
        setError('Error initializing CAPTCHA. Please refresh the page.');
        console.error('Turnstile error:', err);
      }
    }
  }, [loaded, siteKey, onVerify]);

  return (
    <div className="w-full space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div 
        id="captcha-container" 
        className="flex justify-center"
        aria-label="CAPTCHA verification"
      ></div>
    </div>
  );
};

export default Captcha;
