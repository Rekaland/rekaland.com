import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Bookmark, History, Trash2 } from "lucide-react";
import { PropertyCard } from "@/components/products/PropertyCard";
import { useToast } from "@/hooks/use-toast";
import { PropertyProps } from "@/types/product";

interface SavedProperty {
  id: number;
  title: string;
  location: string;
  type: string;
  price: string;
  priceNumeric: number;
  area: string;
  image: string;
  features: string[];
  category: string;
}

interface SearchHistoryItem {
  id: number;
  type: string;
  propertyId: number;
  timestamp: string;
  propertyTitle?: string;
}

const ProfilePage = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      loadUserData();
    }
  }, [isAuthenticated, navigate, user]);

  const loadUserData = () => {
    if (!user) return;
    
    const savedPropertyIds = JSON.parse(localStorage.getItem(`savedProperties_${user.email}`) || '[]');
    const allProperties = JSON.parse(localStorage.getItem('allProperties') || '[]');
    
    const userSavedProperties = savedPropertyIds.map((id: number) => {
      const prop = allProperties.find((prop: any) => prop.id === id);
      if (prop) {
        return {
          ...prop,
          priceNumeric: typeof prop.priceNumeric === 'number' ? prop.priceNumeric : 
                      parseInt(prop.price.replace(/\D/g, ''), 10) || 0,
          category: prop.category || 'uncategorized'
        };
      }
      return null;
    }).filter(Boolean);
    
    setSavedProperties(userSavedProperties);
    
    const history = JSON.parse(localStorage.getItem(`searchHistory_${user.email}`) || '[]');
    
    const enrichedHistory = history.map((item: SearchHistoryItem) => {
      const property = allProperties.find((p: SavedProperty) => p.id === item.propertyId);
      return {
        ...item,
        propertyTitle: property?.title || "Properti tidak ditemukan"
      };
    });
    
    setSearchHistory(enrichedHistory);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari akun Anda",
      duration: 1000,
      className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
    });
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  const clearSavedProperties = () => {
    if (!user) return;
    
    localStorage.setItem(`savedProperties_${user.email}`, JSON.stringify([]));
    setSavedProperties([]);
    
    toast({
      title: "Daftar Properti Dibersihkan",
      description: "Semua properti yang diminati telah dihapus",
      className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
    });
  };

  const clearSearchHistory = () => {
    if (!user) return;
    
    localStorage.setItem(`searchHistory_${user.email}`, JSON.stringify([]));
    setSearchHistory([]);
    
    toast({
      title: "Riwayat Pencarian Dibersihkan",
      description: "Semua riwayat pencarian telah dihapus",
      className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
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
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <Bookmark size={16} className="mr-2 text-orange-500" />
                      Properti yang Diminati
                    </h3>
                    {savedProperties.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs border-red-300 text-red-500 hover:bg-red-50"
                        onClick={clearSavedProperties}
                      >
                        <Trash2 size={14} className="mr-1" /> Hapus Semua
                      </Button>
                    )}
                  </div>
                  
                  {savedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {savedProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Belum ada properti yang disimpan.</p>
                  )}
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <History size={16} className="mr-2 text-orange-500" />
                      Riwayat Pencarian
                    </h3>
                    {searchHistory.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs border-red-300 text-red-500 hover:bg-red-50"
                        onClick={clearSearchHistory}
                      >
                        <Trash2 size={14} className="mr-1" /> Hapus Semua
                      </Button>
                    )}
                  </div>
                  
                  {searchHistory.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {searchHistory.map((item) => (
                        <div key={item.id} className="bg-white p-3 rounded-md shadow-sm border border-gray-100 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.propertyTitle}</p>
                            <p className="text-xs text-gray-500">{formatDate(item.timestamp)}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-xs hover:bg-orange-50"
                            onClick={() => navigate(`/produk?search=${encodeURIComponent(item.propertyTitle || '')}`)}
                          >
                            Lihat Lagi
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Belum ada riwayat pencarian.</p>
                  )}
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
