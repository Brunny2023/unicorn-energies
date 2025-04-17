
import { useState } from 'react';

// Use an empty string for site key to avoid process reference
const CLOUDFLARE_SITE_KEY = '';

export const useCaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [verified, setVerified] = useState(true); // Always set verified to true by default

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setVerified(true);
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    // Keep verified as true
  };

  return {
    siteKey: CLOUDFLARE_SITE_KEY,
    token: captchaToken,
    verified: true, // Always return true
    handleVerify: handleCaptchaVerify,
    resetCaptcha,
  };
};

export default useCaptcha;
