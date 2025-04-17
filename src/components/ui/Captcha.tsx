
import React from 'react';

// This is a dummy component that does nothing but passes verification automatically
interface CaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
}

const Captcha = ({ onVerify }: CaptchaProps) => {
  // Automatically verify on mount with a dummy token
  React.useEffect(() => {
    // Immediately call verify with a dummy token
    onVerify("dummy-captcha-token-auto-verified");
  }, [onVerify]);

  // Return empty div for spacing
  return null;
};

export default Captcha;
