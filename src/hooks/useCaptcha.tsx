
import { useState } from 'react';

// This is a dummy hook that always returns "verified: true"
export const useCaptcha = () => {
  // Always provide a dummy token
  const [captchaToken] = useState<string>("dummy-token-always-verified");
  
  // Dummy functions that do nothing but maintain the API
  const handleCaptchaVerify = () => {
    console.log("Captcha verification bypassed - always returns verified");
  };

  const resetCaptcha = () => {
    console.log("Captcha reset bypassed - always verified");
  };

  return {
    siteKey: "dummy-key-not-needed",
    token: captchaToken,
    verified: true, // Always return true
    handleVerify: handleCaptchaVerify,
    resetCaptcha,
  };
};

export default useCaptcha;
