
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/layout/Layout";
import { FcGoogle } from "react-icons/fc";
import { Loader2, ArrowLeft } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

// Use a real reCAPTCHA site key for production
// For testing, the reCAPTCHA v2 site key below works for localhost and 127.0.0.1
// For production, replace with your own site key from https://www.google.com/recaptcha/admin
const RECAPTCHA_SITE_KEY = "6LfDiTkrAAAAADvq28gv_GoI0LMuTZiQO4RR-HSE"; 

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
  const redirectTo = queryParams.get('redirect_to') || '/';

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

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex flex-col justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-md mb-4">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="flex items-center gap-2 hover:bg-gray-100"
            size="sm"
          >
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </Button>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-rekaland-black">Masuk ke REKA<span className="text-rekaland-orange">LAND</span></CardTitle>
            <CardDescription>Masukkan kredensial Anda untuk mengakses akun</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Link to="/reset-password" className="text-sm text-rekaland-orange hover:underline">
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
                />
              </div>
              
              <div className="flex justify-center my-2">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleReCaptchaChange}
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
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">Atau</span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              disabled={isLoading || !recaptchaToken}
            >
              <FcGoogle className="h-5 w-5" />
              Masuk dengan Google
            </Button>
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
