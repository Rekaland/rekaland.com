
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface EmailLoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  error: string;
  recaptchaToken: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const EmailLoginForm: React.FC<EmailLoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  error,
  recaptchaToken,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Kata Sandi</Label>
          <Link
            to="/reset-password"
            className="text-sm text-rekaland-orange hover:underline"
          >
            Lupa kata sandi?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Kata Sandi Anda"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="off"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full bg-rekaland-orange hover:bg-orange-600"
        disabled={isLoading || !recaptchaToken}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          "Masuk"
        )}
      </Button>
    </form>
  );
};
