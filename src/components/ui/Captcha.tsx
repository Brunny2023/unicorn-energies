
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
  const [rendered, setRendered] = useState(false);

  // Load the Turnstile script
  useEffect(() => {
    if (typeof window.turnstile !== 'undefined') {
      setLoaded(true);
      return;
    }

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
      try {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      } catch (err) {
        console.error('Error removing script:', err);
      }
      
      // Reset widget if it exists
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.reset(widgetId);
        } catch (err) {
          console.error('Error resetting Turnstile:', err);
        }
      }
    };
  }, []);
  
  // Render the CAPTCHA
  useEffect(() => {
    if (loaded && window.turnstile && !rendered) {
      try {
        const captchaContainer = document.getElementById('captcha-container');
        if (!captchaContainer) {
          console.error('Captcha container not found');
          return;
        }

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
        setRendered(true);
      } catch (err) {
        setError('Error initializing CAPTCHA. Please refresh the page.');
        console.error('Turnstile error:', err);
      }
    }
  }, [loaded, siteKey, onVerify, rendered]);

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
