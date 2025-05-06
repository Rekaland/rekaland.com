
import React, { useState, useEffect } from 'react';
import { useAuthMethods } from '../hooks/useAuthMethods';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuthMethods();
  const { session, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Jika sudah login, redirect ke halaman admin
  if (session && user) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Email dan password wajib diisi');
      return;
    }
    
    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login Admin</CardTitle>
          <CardDescription>
            Masukkan email dan password untuk akses dashboard admin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="contoh@rekaland.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-green-600 hover:text-green-800">
                  Lupa password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Sedang Masuk...' : 'Masuk'}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-500">
            <p>Default email admin: rekaland.idn@gmail.com</p>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="justify-center p-4">
          <p className="text-xs text-center text-gray-500">
            Dengan melakukan login, Anda menyetujui Syarat dan Ketentuan serta Kebijakan Privasi kami
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
