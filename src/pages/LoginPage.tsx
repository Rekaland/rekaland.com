
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Cek apakah ada redirect_to parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const redirectTo = queryParams.get('redirect_to');
    if (redirectTo) {
      localStorage.setItem('redirectAfterLogin', redirectTo);
    }
  }, [location]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = login(email, password);
      
      if (success) {
        handlePostLoginActions();
      } else {
        toast({
          title: "Gagal Masuk",
          description: "Email atau kata sandi tidak valid",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat masuk",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    
    try {
      const success = loginWithGoogle();
      
      if (success) {
        handlePostLoginActions();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat masuk dengan Google",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePostLoginActions = () => {
    // Cek apakah ada properti yang ingin disimpan sebelum login
    const propertyToSave = localStorage.getItem('lastPropertyToSave');
    if (propertyToSave) {
      // Simulasi menyimpan properti
      const propertyId = parseInt(propertyToSave);
      const savedProperties = JSON.parse(localStorage.getItem(`savedProperties_${email}`) || '[]');
      
      if (!savedProperties.includes(propertyId)) {
        savedProperties.push(propertyId);
        localStorage.setItem(`savedProperties_${email}`, JSON.stringify(savedProperties));
        
        toast({
          title: "Properti Disimpan",
          description: "Properti telah ditambahkan ke daftar yang Anda minati",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
        });
      }
      
      // Hapus properti dari localStorage
      localStorage.removeItem('lastPropertyToSave');
    }
    
    // Cek apakah ada halaman redirect setelah login
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    if (redirectPath) {
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } else {
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <Link to="/" className="flex justify-center">
              <h1 className="text-3xl font-bold text-center">
                REKA<span className="text-rekaland-orange">LAND</span>
              </h1>
            </Link>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Masuk ke akun Anda
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Atau{" "}
              <Link
                to="/daftar"
                className="font-medium text-rekaland-orange hover:text-orange-500"
              >
                daftar akun baru
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="nama@example.com"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Gunakan 'gueadmin' untuk masuk sebagai admin
                </p>
              </div>
              <div>
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Gunakan 'gueadmin' untuk masuk sebagai admin
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-rekaland-orange focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-rekaland-orange hover:text-orange-500"
                >
                  Lupa kata sandi?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-rekaland-orange hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Masuk"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Atau masuk dengan
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex justify-center items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"
                  />
                </svg>
                <span>Google</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
