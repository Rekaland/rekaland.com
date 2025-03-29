
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { ShieldAlert, Info } from "lucide-react";

const AdminSetupPage = () => {
  const [name, setName] = useState("Rekaland Admin");
  const [email, setEmail] = useState("rekaland.idn@gmail.com");
  const [password, setPassword] = useState("rekaland123");
  const [confirmPassword, setConfirmPassword] = useState("rekaland123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { registerAdmin } = useAuthMethods();
  const navigate = useNavigate();

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Kata sandi tidak cocok.");
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await registerAdmin(email, password, name);
      if (success) {
        navigate("/admin");
      }
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan saat mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-1 pb-2">
          <CardTitle className="text-2xl">
            REKA<span className="text-rekaland-orange">LAND</span> Admin Setup
          </CardTitle>
          <CardDescription>
            Buat akun admin pertama untuk website Rekaland
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-4">
          <Alert className="bg-amber-50 border-amber-200">
            <ShieldAlert className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Pengaturan admin</AlertTitle>
            <AlertDescription className="text-amber-700">
              Halaman ini hanya boleh diakses untuk membuat admin pertama kali. Harap gunakan kredensial yang aman.
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleSetupAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Admin</Label>
              <Input 
                id="name" 
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="pt-2">
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700 text-sm">
                  Kredensial default sudah diisi: email: rekaland.idn@gmail.com, kata sandi: rekaland123
                </AlertDescription>
              </Alert>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Buat Akun Admin"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="text-center text-sm text-gray-600 flex justify-center pb-6">
          Dengan membuat akun, Anda menyetujui syarat dan ketentuan penggunaan
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSetupPage;
