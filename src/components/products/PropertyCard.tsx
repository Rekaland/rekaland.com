
import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Check, Bookmark, Heart, Eye, Share2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface PropertyProps {
  id: number | string;
  title: string;
  location: string;
  type: string;
  price: string | number;
  priceNumeric?: number;
  dpPrice?: string | number;
  area: string;
  image: string;
  features: string[];
  category?: string;
}

interface PropertyCardProps {
  property: PropertyProps;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price untuk tampilan
  const formatPrice = (price: string | number) => {
    if (typeof price === 'number') {
      return `Rp ${(price / 1000000).toFixed(0)}jt`;
    }
    return price;
  };

  // Mendapatkan URL kategori berdasarkan tipe properti
  const getCategoryUrl = () => {
    if (property.category) {
      return `/produk/${property.category}`;
    }
    
    if (property.type.toLowerCase().includes('kosongan')) {
      return '/produk/kavling-kosongan';
    } else if (property.type.toLowerCase().includes('bangunan')) {
      return '/produk/kavling-setengah-jadi';
    } else if (property.type.toLowerCase().includes('siap huni')) {
      return '/produk/kavling-siap-huni';
    }
    
    return '/produk';
  };
  
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
      `Halo, saya tertarik dan ingin tahu lebih lanjut tentang properti "${property.title}" yang berlokasi di ${property.location} dengan harga ${formatPrice(property.price)}.`
    );
    window.open(`https://wa.me/6282177968062?text=${text}`, '_blank');
  };

  const handleSaveProperty = () => {
    if (!isAuthenticated) {
      toast({
        title: "Anda belum masuk",
        description: "Silakan masuk atau daftar untuk m`enyimpan properti",
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
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56">
        {/* Gambar dengan hover zoom effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title} 
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>
        
        {/* Overlay gradient pada hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-${isHovered ? '100' : '70'} transition-opacity duration-300`}></div>
        
        {/* Label properti */}
        <Link to={getCategoryUrl()}>
          <span className="absolute top-3 left-3 bg-rekaland-orange text-white px-3 py-1 text-sm font-medium rounded-full shadow-md hover:bg-orange-600 cursor-pointer">
            {property.type}
          </span>
        </Link>
        
        {/* Tombol simpan */}
        <Button 
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full p-1.5 bg-white shadow-md ${isSaved ? 'text-rekaland-orange' : 'text-gray-500'} hover:text-rekaland-orange hover:bg-white/90 transition-all duration-300`}
          onClick={handleSaveProperty}
        >
          <Heart 
            size={18} 
            className={isSaved ? "fill-current" : ""} 
          />
        </Button>
        
        {/* Action buttons yang muncul pada hover */}
        <div className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/90 shadow-md hover:bg-white text-gray-700 hover:text-rekaland-orange"
            onClick={() => navigate(`/produk/detail/${property.id}`)}
          >
            <Eye size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/90 shadow-md hover:bg-white text-gray-700 hover:text-rekaland-orange"
          >
            <Share2 size={16} />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-rekaland-orange transition-colors">{property.title}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <MapPin size={16} className="mr-1 text-rekaland-orange flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="font-bold text-rekaland-orange text-lg">{formatPrice(property.price)}</div>
            <div className="text-xs text-gray-500">Cash</div>
          </div>
          <div className="text-right">
            <div className="font-medium text-gray-700">{formatPrice(property.dpPrice || (typeof property.priceNumeric === 'number' ? property.priceNumeric * 0.3 : property.price))}</div>
            <div className="text-xs text-gray-500">DP Kredit</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Cash
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Kredit
          </Badge>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {property.area}
          </Badge>
        </div>
        
        <div className="border-t border-gray-100 pt-3 mt-2">
          <div className="grid grid-cols-1 gap-1 mb-3">
            {property.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <Check size={14} className="text-green-500 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
          <Button 
            onClick={openWhatsApp}
            className="w-full bg-gray-100 text-rekaland-black hover:bg-rekaland-orange hover:text-white transition-colors font-medium"
          >
            Hubungi Agen <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
