
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";
import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyProps } from "@/types/product";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth(); // Using logout instead of signOut
  const [savedProperties, setSavedProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      // Load profile data
      setProfile({
        name: user.name || "",
        phone: "",
        email: user.email || "",
      });
      
      fetchSavedProperties();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch saved properties for demonstration
  const fetchSavedProperties = async () => {
    setLoading(true);
    try {
      // Untuk demonstrasi, kita ambil beberapa properti random
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .limit(3);
      
      if (error) throw error;
      
      if (data) {
        // Konversi data properti ke format PropertyProps
        const formattedProperties = data.map(item => ({
          id: String(item.id), // Ensure id is a string
          title: item.title,
          location: item.location,
          type: item.category,
          price: `Rp ${(item.price / 1000000).toFixed(0)} Juta`,
          priceNumeric: item.price,
          dpPrice: item.price * 0.3,
          area: `${item.land_size || 100} m²`,
          image: item.images && item.images.length > 0 
            ? item.images[0] 
            : `https://source.unsplash.com/random/800x600?property&sig=${item.id}`,
          category: item.category,
          features: ["Lokasi Strategis", "ROI Tinggi", "SHM"],
        }));
        
        setSavedProperties(formattedProperties);
      }
    } catch (err) {
      console.error("Error fetching saved properties:", err);
      toast({
        title: "Gagal memuat properti tersimpan",
        description: "Terjadi kesalahan saat mengambil data properti tersimpan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = () => {
    toast({
      title: "Profil diperbarui",
      description: "Informasi profil Anda telah berhasil diperbarui",
      className: "bg-green-500 text-white",
    });
  };

  const handleSignOut = async () => {
    try {
      if (logout) {  // Using logout instead of signOut
        await logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Container animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto px-4 py-10"
        initial="hidden"
        animate="show"
        variants={containerAnimation}
      >
        <motion.h1 
          className="text-2xl font-bold mb-8"
          variants={itemAnimation}
        >
          Profil Saya
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div variants={itemAnimation}>
            <Card className="md:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src="https://source.unsplash.com/random/200x200?person"
                      alt={profile.name}
                    />
                    <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-gray-500">{profile.email}</p>
                </div>

                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full mb-6"
                  onClick={handleSignOut}
                >
                  Keluar
                </Button>

                <Separator className="my-4" />

                <div className="text-sm text-gray-500 text-center">
                  <p>Member sejak Maret 2023</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemAnimation}>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Pengaturan Akun</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="profile">
                  <TabsList className="mb-6">
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="saved">Properti Tersimpan</TabsTrigger>
                    <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) =>
                              setProfile({ ...profile, name: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile({ ...profile, phone: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <Button onClick={handleUpdateProfile}>
                        Simpan Perubahan
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="saved">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Properti Tersimpan</h3>
                      
                      {loading ? (
                        <div className="text-center py-10">
                          <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p className="text-gray-500">Memuat properti tersimpan...</p>
                        </div>
                      ) : savedProperties.length > 0 ? (
                        <PropertyList properties={savedProperties} />
                      ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                          <p className="text-gray-500 mb-4">Belum ada properti tersimpan</p>
                          <Button onClick={() => navigate("/produk")}>
                            Jelajahi Properti
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Pengaturan Notifikasi</h3>
                      <p className="text-gray-500">
                        Fitur pengaturan notifikasi akan segera tersedia.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ProfilePage;
