
import { useState } from 'react';

// This is now a dummy hook that always returns "verified: true"
export const useCaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>("dummy-token");
  
  // Dummy functions that do nothing but maintain the API
  const handleCaptchaVerify = () => {
    console.log("Captcha verification bypassed");
  };

  const resetCaptcha = () => {
    console.log("Captcha reset bypassed");
  };

  return {
    siteKey: "no-site-key-needed",
    token: captchaToken,
    verified: true, // Always return true
    handleVerify: handleCaptchaVerify,
    resetCaptcha,
  };
};

export default useCaptcha;
