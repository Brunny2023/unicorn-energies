
import { useState } from 'react';

// This is your site key
const CLOUDFLARE_SITE_KEY = '0x4AAAAAABGKmbd6_-BPt1A-';

// Define the turnstile interface globally to avoid duplicate declarations
declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, params: any) => string;
      reset: (widgetId: string) => void;
    };
  }
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
