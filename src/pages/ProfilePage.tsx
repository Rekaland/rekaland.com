
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react";

const ProfilePage = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profil Pengguna</h1>
          
          <Card className="mb-8 overflow-hidden shadow-lg border-0 animate-in fade-in-70 duration-300">
            <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-orange-50 to-amber-50 p-6">
              <Avatar className="h-20 w-20 ring-2 ring-orange-200">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-orange-100 text-rekaland-orange">{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-gray-500">{user.email}</p>
                <span className="inline-block px-3 py-1 mt-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-sm font-medium capitalize">
                  {user.role}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-medium mb-2">Properti yang Diminati</h3>
                  <p className="text-gray-500">Belum ada properti yang disimpan.</p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-medium mb-2">Riwayat Pencarian</h3>
                  <p className="text-gray-500">Belum ada riwayat pencarian.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  {isAdmin && (
                    <Button 
                      onClick={goToAdmin}
                      className="flex gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard Admin
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    onClick={handleLogout} 
                    className="flex gap-2 border-red-300 text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
