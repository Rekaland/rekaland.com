
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import ReCAPTCHA from "react-google-recaptcha";
import { ReCaptchaComponent } from "@/components/auth/ReCaptchaComponent";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // Get redirect_to from URL query
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect_to') || '/admin';

  // Redirect to main page if already logged in
  useEffect(() => {
    console.log("Auth status changed in LoginPage, isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const handleReCaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setError("Mohon selesaikan reCAPTCHA terlebih dahulu.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", email, password);
      console.log("ReCAPTCHA token:", recaptchaToken);
      
      const success = await login(email, password);
      console.log("Login success:", success);
      
      // No need for manual navigation, useEffect will handle redirection
      // when isAuthenticated state changes
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Terjadi kesalahan saat login.");
    } finally {
      setIsLoading(false);
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    
    // Check if reCAPTCHA is completed for Google login as well
    if (!recaptchaToken) {
      setError("Mohon selesaikan reCAPTCHA terlebih dahulu.");
      return;
    }
    
    setIsLoading(true);
    try {
      await loginWithGoogle();
      // Redirect will be handled by hook useAuth
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.message || "Terjadi kesalahan saat login dengan Google.");
    } finally {
      setIsLoading(false);
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-rekaland-black">Masuk ke REKA<span className="text-rekaland-orange">LAND</span></CardTitle>
            <CardDescription>Masukkan kredensial Anda untuk mengakses akun</CardDescription>
          </CardHeader>
          <CardContent>
            <EmailLoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLoading={isLoading}
              error={error}
              recaptchaToken={recaptchaToken}
              onSubmit={handleSubmit}
            />
            
            <ReCaptchaComponent ref={recaptchaRef} onChange={handleReCaptchaChange} />
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">Atau</span>
              </div>
            </div>
            
            <GoogleLoginButton 
              onClick={handleGoogleLogin}
              disabled={isLoading || !recaptchaToken}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-gray-600">
              Belum memiliki akun?{" "}
              <Link to="/daftar" className="text-rekaland-orange hover:underline font-medium">
                Daftar
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
