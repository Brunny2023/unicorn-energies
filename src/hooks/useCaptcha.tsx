import { useState } from 'react';

// Replace the hardcoded site key with an environment variable
const CLOUDFLARE_SITE_KEY = process.env.REACT_APP_CAPTCHA_SITE_KEY || '';

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
    siteKey: CLOUDFLARE_SITE_KEY, // Updated to use the environment variable
    token: captchaToken,
    verified,
    handleVerify: handleCaptchaVerify,
    resetCaptcha,
  };
};

export default useCaptcha;
