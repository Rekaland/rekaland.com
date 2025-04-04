import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, MapPin, CheckCircle2 } from "lucide-react";
import MainLayout from '@/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      setLoading(true);
      try {
        if (user) {
          const { data, error } = await supabase
            .from('saved_properties')
            .select('property_id')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          if (data) {
            const propertyIds = data.map(item => item.property_id);
            if (propertyIds.length > 0) {
              const { data: properties, error: propertiesError } = await supabase
                .from('properties')
                .select('*')
                .in('id', propertyIds);

              if (propertiesError) {
                throw propertiesError;
              }

              setSavedProperties(properties || []);
            } else {
              setSavedProperties([]);
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching saved properties:", error);
        toast({
          title: "Gagal memuat properti yang disimpan",
          description: "Terjadi kesalahan saat mengambil data dari server.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [user, toast]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Profil Anda</h1>
          <p className="text-gray-500 dark:text-gray-400">Informasi akun dan properti yang Anda simpan.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detail Akun</CardTitle>
            <CardDescription>Informasi pribadi Anda.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user?.avatar_url || `https://api.dicebear.com/7.x/ лица/svg?seed=${user?.email}`} />
                <AvatarFallback>
                  {user?.name ? user.name[0] : user?.email ? user.email[0] : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{user?.name || 'Pengguna'}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div>
              <Button onClick={handleSignOut} variant="secondary">
                Keluar
              </Button>
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Properti yang Disimpan
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent>
                    <Skeleton className="w-full h-40 rounded-md mb-4" />
                    <Skeleton className="w-3/4 h-6 mb-2" />
                    <Skeleton className="w-1/2 h-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property: any) => (
                <Card key={property.id}>
                  <CardContent className="p-4">
                    <div className="relative">
                      <img
                        src={property.images?.[0] || `https://source.unsplash.com/random/400x300?property&${property.id}`}
                        alt={property.title}
                        className="object-cover rounded-md mb-3 w-full h-40"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                    <p className="text-orange-500 font-semibold">Rp {formatCurrency(property.price)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent>
                <p className="text-gray-500">Belum ada properti yang disimpan.</p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
