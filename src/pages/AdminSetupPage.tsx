
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const AdminSetupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAdmins, setIsCheckingAdmins] = useState(true);
  const [adminsExist, setAdminsExist] = useState(false);
  
  const { registerAdmin, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Cek apakah admin sudah ada
  useEffect(() => {
    const checkAdminsExist = async () => {
      try {
        console.log("Checking if admins exist...");
        setIsCheckingAdmins(true);
        
        const { data, error, count } = await supabase
          .from('user_roles')
          .select('id', { count: 'exact' })
          .eq('role', 'admin');
          
        if (error) {
          console.error("Error checking admins:", error);
          throw error;
        }
        
        console.log("Admin check result:", { count, data });
        
        // Jika sudah ada admin, redirect ke halaman login
        if (count && count > 0) {
          setAdminsExist(true);
          
          // Jika pengguna sudah login dan adalah admin, redirect ke dashboard admin
          if (isAuthenticated && isAdmin) {
            navigate('/admin');
          } else {
            navigate('/login?redirect_to=/admin');
          }
        } else {
          setAdminsExist(false);
        }
      } catch (err) {
        console.error("Error checking admin existence:", err);
      } finally {
        setIsCheckingAdmins(false);
      }
    };
    
    checkAdminsExist();
  }, [navigate, isAuthenticated, isAdmin]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validasi form
    if (!name || !email || !password || !confirmPassword) {
      setError("Semua kolom harus diisi");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok");
      return;
    }
    
    if (password.length < 6) {
      setError("Kata sandi harus minimal 6 karakter");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Buat akun admin baru dengan akses langsung (tanpa perlu email konfirmasi)
      console.log("Creating admin account for:", email);
      
      // 1. Daftarkan admin menggunakan registerAdmin dari useAuth
      const success = await registerAdmin(email, password, name);
      
      if (success) {
        // 2. Redirect ke halaman admin
        navigate('/admin');
      }
    } catch (err: any) {
      console.error("Admin setup error:", err);
      setError(err.message || "Terjadi kesalahan saat membuat akun admin");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Jika sedang memeriksa keberadaan admin
  if (isCheckingAdmins) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rekaland-orange mx-auto mb-4" />
          <p className="text-gray-600">Memeriksa konfigurasi admin...</p>
        </div>
      </div>
    );
  }
  
  // Jika admin sudah ada, redirect ke login sudah ditangani oleh useEffect
  if (adminsExist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rekaland-orange mx-auto mb-4" />
          <p className="text-gray-600">Admin sudah terdaftar, mengalihkan ke halaman login...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <ShieldCheck className="h-6 w-6 text-rekaland-orange" />
            <span>Setup Admin Rekaland</span>
          </CardTitle>
          <CardDescription>
            Buat akun admin pertama untuk mengelola website
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-rekaland-orange hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Buat Akun Admin"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminSetupPage;
