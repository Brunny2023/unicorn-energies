
import React from 'react';

// This is now a dummy component that does nothing
interface CaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
}

const Captcha = ({ onVerify }: CaptchaProps) => {
  // Automatically verify on mount
  React.useEffect(() => {
    // Call verify with a dummy token
    onVerify("dummy-captcha-token");
  }, [onVerify]);

  // Return empty div for spacing
  return <div className="w-full h-4"></div>;
};

export default Captcha;
