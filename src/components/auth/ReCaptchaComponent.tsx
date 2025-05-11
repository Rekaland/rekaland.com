
import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Use a real reCAPTCHA site key for production
// For testing, the reCAPTCHA v2 site key below works for localhost and 127.0.0.1
const RECAPTCHA_SITE_KEY = "6LdOuzUrAAAAAJvMnHrFF565P0julsShM5AtIjaL"; 
const RECAPTCHA_SECRET_KEY = "6LdOuzUrAAAAAPO2G35WD4kP5PzCTnVpgQAKmjfD"; // This should be used server-side only, not in client code

interface ReCaptchaComponentProps {
  onChange: (token: string | null) => void;
}

const ReCaptchaComponent = forwardRef<ReCAPTCHA, ReCaptchaComponentProps>(
  ({ onChange }, ref) => {
    return (
      <div className="flex justify-center my-2">
        <ReCAPTCHA
          ref={ref}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={onChange}
        />
      </div>
    );
  }
);

ReCaptchaComponent.displayName = "ReCaptchaComponent";

export { ReCaptchaComponent, RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY };
