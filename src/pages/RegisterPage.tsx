
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Kata sandi tidak cocok.");
      return;
    }
    
    const success = register(name, email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Terjadi kesalahan saat mendaftar.");
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
    navigate("/");
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
            <CardTitle className="text-2xl text-rekaland-black">Daftar ke REKA<span className="text-rekaland-orange">LAND</span></CardTitle>
            <CardDescription>Lengkapi informasi berikut untuk membuat akun Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Nama lengkap Anda" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Email Anda" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Kata Sandi (min. 8 karakter)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Konfirmasi kata sandi Anda"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Saya menyetujui <Link to="/terms" className="text-rekaland-orange hover:underline">Syarat & Ketentuan</Link> serta <Link to="/privacy" className="text-rekaland-orange hover:underline">Kebijakan Privasi</Link>
                </label>
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <Button type="submit" className="w-full bg-rekaland-orange hover:bg-orange-600">
                Daftar
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
            >
              <FcGoogle className="h-5 w-5" />
              Daftar dengan Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-gray-600">
              Sudah memiliki akun?{" "}
              <Link to="/login" className="text-rekaland-orange hover:underline font-medium">
                Masuk
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterPage;
