
import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Use a real reCAPTCHA site key for production
// For testing, the reCAPTCHA v2 site key below works for localhost and 127.0.0.1
const RECAPTCHA_SITE_KEY = "6LdOuzUrAAAAAJvMnHrFF565P0julsShM5AtIjaL"; 

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

export { ReCaptchaComponent, RECAPTCHA_SITE_KEY };
