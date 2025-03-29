
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus } from "lucide-react";
import Layout from "@/components/layout/Layout";

const AuthPage = () => {
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get redirect URL from query params
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirect_to") || "/";
  
  // Form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginData.email.trim()) {
      newErrors.email = "Email diperlukan";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    
    if (!loginData.password) {
      newErrors.password = "Kata sandi diperlukan";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!registerData.name.trim()) {
      newErrors.name = "Nama lengkap diperlukan";
    }
    
    if (!registerData.email.trim()) {
      newErrors.email = "Email diperlukan";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    
    if (!registerData.password) {
      newErrors.password = "Kata sandi diperlukan";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter";
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi kata sandi tidak cocok";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;
    
    setIsLoading(true);
    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        navigate(redirectTo);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;
    
    setIsLoading(true);
    try {
      const success = await register(
        registerData.name,
        registerData.email,
        registerData.password
      );
      if (success) {
        navigate(redirectTo);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      // Note: Redirect is handled by Supabase OAuth
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto max-w-md py-16 px-4">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="flex items-center gap-1.5">
              <LogIn size={16} />
              Masuk
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-1.5">
              <UserPlus size={16} />
              Daftar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Masuk ke Akun</CardTitle>
                <CardDescription>
                  Masukkan email dan kata sandi Anda untuk mengakses akun
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className={errors.email ? "border-red-300" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Kata Sandi</Label>
                      <Link to="/forgot-password" className="text-xs text-orange-600 hover:underline">
                        Lupa kata sandi?
                      </Link>
                    </div>
                    <Input 
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className={errors.password ? "border-red-300" : ""}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-rekaland-orange hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Memproses..." : "Masuk"}
                  </Button>
                  
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-2 text-gray-500">Atau lanjutkan dengan</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="currentColor"/>
                    </svg>
                    Login dengan Google
                  </Button>
                </CardContent>
              </form>
              
              <CardFooter className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">
                  Belum memiliki akun?{" "}
                  <button 
                    className="text-orange-600 hover:underline"
                    onClick={() => document.querySelector('button[value="register"]')?.click()}
                  >
                    Daftar sekarang
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Buat Akun Baru</CardTitle>
                <CardDescription>
                  Daftar untuk mulai menggunakan layanan Rekaland
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Nama lengkap Anda"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      className={errors.name ? "border-red-300" : ""}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input 
                      id="reg-email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className={errors.email ? "border-red-300" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Kata Sandi</Label>
                    <Input 
                      id="reg-password"
                      name="password"
                      type="password"
                      placeholder="Minimal 6 karakter"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className={errors.password ? "border-red-300" : ""}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Konfirmasi Kata Sandi</Label>
                    <Input 
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Ulangi kata sandi"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className={errors.confirmPassword ? "border-red-300" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-rekaland-orange hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Memproses..." : "Daftar"}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Dengan mendaftar, Anda menyetujui <Link to="/terms" className="text-orange-600 hover:underline">Syarat & Ketentuan</Link> dan <Link to="/privacy" className="text-orange-600 hover:underline">Kebijakan Privasi</Link> kami.
                  </p>
                </CardContent>
              </form>
              <CardFooter className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">
                  Sudah memiliki akun?{" "}
                  <button 
                    className="text-orange-600 hover:underline"
                    onClick={() => document.querySelector('button[value="login"]')?.click()}
                  >
                    Masuk sekarang
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AuthPage;
