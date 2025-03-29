
import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Check, Bookmark } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface PropertyProps {
  id: number;
  title: string;
  location: string;
  type: string;
  price: string;
  area: string;
  image: string;
  features: string[];
}

interface PropertyCardProps {
  property: PropertyProps;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  
  // Cek apakah properti sudah tersimpan oleh user
  useEffect(() => {
    if (isAuthenticated && user) {
      // Simulasi cek properti tersimpan dari localStorage
      const savedProperties = JSON.parse(localStorage.getItem(`savedProperties_${user.email}`) || '[]');
      setIsSaved(savedProperties.some((saved: number) => saved === property.id));
    }
  }, [isAuthenticated, user, property.id]);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo, saya tertarik dan ingin tahu lebih lanjut tentang properti "${property.title}" yang berlokasi di ${property.location} dengan harga ${property.price}.`
    );
    window.open(`https://wa.me/6282177968062?text=${text}`, '_blank');
  };

  const handleSaveProperty = () => {
    if (!isAuthenticated) {
      toast({
        title: "Anda belum masuk",
        description: "Silakan masuk atau daftar untuk menyimpan properti",
        className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
      });
      
      // Simpan properti yang ingin disimpan di localStorage untuk diakses setelah login
      localStorage.setItem('lastPropertyToSave', property.id.toString());
      
      // Arahkan ke halaman login
      navigate('/login');
      return;
    }
    
    // Simulasi menyimpan properti dengan localStorage
    const savedProperties = JSON.parse(localStorage.getItem(`savedProperties_${user?.email}`) || '[]');
    
    if (isSaved) {
      // Hapus dari daftar simpanan
      const updatedProperties = savedProperties.filter((id: number) => id !== property.id);
      localStorage.setItem(`savedProperties_${user?.email}`, JSON.stringify(updatedProperties));
      setIsSaved(false);
      
      toast({
        title: "Properti dihapus dari simpanan",
        description: `"${property.title}" telah dihapus dari daftar properti yang Anda minati`,
        className: "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0",
      });
    } else {
      // Tambahkan ke daftar simpanan
      savedProperties.push(property.id);
      localStorage.setItem(`savedProperties_${user?.email}`, JSON.stringify(savedProperties));
      setIsSaved(true);
      
      // Simpan juga detail properti
      const allProperties = JSON.parse(localStorage.getItem('allProperties') || '[]');
      if (!allProperties.some((p: PropertyProps) => p.id === property.id)) {
        allProperties.push(property);
        localStorage.setItem('allProperties', JSON.stringify(allProperties));
      }
      
      toast({
        title: "Properti disimpan!",
        description: `"${property.title}" telah ditambahkan ke daftar properti yang Anda minati`,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
      });
    }
    
    // Simpan juga ke riwayat pencarian
    const searchHistory = JSON.parse(localStorage.getItem(`searchHistory_${user?.email}`) || '[]');
    const historyItem = { 
      id: Date.now(), 
      type: 'view', 
      propertyId: property.id, 
      timestamp: new Date().toISOString() 
    };
    searchHistory.unshift(historyItem);
    
    // Batasi riwayat pencarian hingga 20 item
    if (searchHistory.length > 20) searchHistory.pop();
    
    localStorage.setItem(`searchHistory_${user?.email}`, JSON.stringify(searchHistory));
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0">
      <div className="relative h-60">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover" 
        />
        <span className="absolute top-3 left-3 bg-rekaland-orange text-white px-3 py-1 text-sm rounded-full">
          {property.type}
        </span>
        <Button 
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full p-1 bg-white ${isSaved ? 'text-rekaland-orange' : 'text-gray-500'} hover:text-rekaland-orange hover:bg-white/90`}
          onClick={handleSaveProperty}
        >
          <Bookmark 
            size={18} 
            className={isSaved ? "fill-current" : ""} 
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{property.title}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex justify-between mb-4">
          <span className="font-bold text-rekaland-orange">{property.price}</span>
          <span className="text-gray-500">{property.area}</span>
        </div>
        
        <div className="border-t border-gray-100 pt-3 mt-2">
          <div className="grid grid-cols-1 gap-1 mb-3">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <Check size={14} className="text-green-500 mr-2" />
                {feature}
              </div>
            ))}
          </div>
          <Button 
            onClick={openWhatsApp}
            className="w-full bg-gray-100 text-rekaland-black hover:bg-rekaland-orange hover:text-white transition-colors"
          >
            Hubungi Kami <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
