
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

interface GoogleLoginButtonProps {
  onClick: () => Promise<void>;
  disabled: boolean;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={onClick}
      disabled={disabled}
    >
      <FcGoogle className="h-5 w-5" />
      Masuk dengan Google
    </Button>
  );
};
