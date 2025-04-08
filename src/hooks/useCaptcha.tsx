
import { useState } from 'react';

// This is your site key
const CLOUDFLARE_SITE_KEY = '0x4AAAAAABGKmbd6_-BPt1A-';

// Define the turnstile interface - removed global declaration since it's in App.tsx
interface TurnstileInterface {
  render: (container: string | HTMLElement, params: any) => string;
  reset: (widgetId: string) => void;
}

export const useCaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setVerified(true);
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    setVerified(false);
  };

  return {
    siteKey: CLOUDFLARE_SITE_KEY,
    token: captchaToken,
    verified,
    handleVerify: handleCaptchaVerify,
    resetCaptcha
  };
};

export default useCaptcha;
