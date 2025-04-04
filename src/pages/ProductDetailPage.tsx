import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Heart, MapPin, Home, Phone, Calendar, Check, ArrowRight, ChevronLeft, Share2, Loader2 } from "lucide-react";
import { usePropertyDetail } from "@/hooks/useProperties";
import { useProductContent } from "@/hooks/useProductContent";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { formatCurrency } from "@/lib/utils";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("deskripsi");
  
  // Mengambil detail properti dari Supabase
  const { property, loading: propertyLoading, error: propertyError, refetchPropertyDetail } = usePropertyDetail(id);
  
  // Mengambil konten detail properti dari Supabase (jika ada)
  const { content, loading: contentLoading, error: contentError } = useProductContent(id);
  
  // Setup real-time sync untuk pembaruan
  const { isSubscribed: isPropertySynced } = useRealTimeSync('properties', refetchPropertyDetail);
  const { isSubscribed: isContentSynced } = useRealTimeSync('product_contents');
  
  // Menggabungkan status loading
  const isLoading = propertyLoading || contentLoading;
  
  // Menggabungkan error
  const error = propertyError || contentError;

  // Kembali ke halaman sebelumnya
  const handleGoBack = () => {
    navigate(-1);
  };

  // Menampilkan pesan WhatsApp
  const handleContactAgent = () => {
    if (!property) return;
    
    const text = encodeURIComponent(
      `Halo, saya tertarik dan ingin tahu lebih lanjut tentang properti "${property.title}" yang berlokasi di ${property.location} dengan harga Rp ${formatCurrency(property.price)}.`
    );
    window.open(`https://wa.me/6282177968062?text=${text}`, '_blank');
  };

  // Format features dari konten
  const getFormattedFeatures = () => {
    if (content?.features && Array.isArray(content.features) && content.features.length > 0) {
      return content.features;
    }
    
    // Default features jika tidak ada konten
    return [
      "Akses mudah",
      "Lokasi strategis",
      "Sertifikat SHM",
      "Bebas banjir",
      "ROI tinggi",
    ];
  };

  // Mendapatkan spesifikasi properti
  const getPropertySpecifications = () => {
    if (content?.specifications && Object.keys(content.specifications).length > 0) {
      return content.specifications;
    }
    
    // Fallback ke data dasar dari properti
    return {
      "Luas Tanah": property?.land_size ? `${property.land_size} m²` : "N/A",
      "Luas Bangunan": property?.building_size ? `${property.building_size} m²` : "N/A",
      "Kamar Tidur": property?.bedrooms || "N/A",
      "Kamar Mandi": property?.bathrooms || "N/A",
      "Status": property?.status === "available" ? "Tersedia" : 
                property?.status === "sold" ? "Terjual" : "Pending",
    };
  };

  // Format kategori untuk label
  const getCategoryLabel = () => {
    if (!property) return { text: "Properti", className: "bg-gray-500" };
    
    switch(property.category) {
      case 'empty_lot':
        return { text: "Kavling Kosongan", className: "bg-blue-500" };
      case 'semi_finished':
        return { text: "Kavling Bangunan", className: "bg-yellow-500" };
      case 'ready_to_occupy':
        return { text: "Kavling Siap Huni", className: "bg-green-500" };
      default:
        return { text: "Properti", className: "bg-gray-500" };
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Memuat detail properti...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16 bg-red-50 rounded-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={handleGoBack} variant="outline">Kembali</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!property) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Properti Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">Detail properti yang Anda cari tidak tersedia atau telah dihapus.</p>
            <Button onClick={() => navigate('/produk')} variant="default">Lihat Semua Properti</Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const categoryInfo = getCategoryLabel();
  const images = property.images?.length ? property.images : 
    [`https://source.unsplash.com/random/800x600?property&sig=${property.id}`];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-gray-600 mr-4" 
            onClick={handleGoBack}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Kembali
          </Button>
          <div>
            {(isPropertySynced || isContentSynced) && (
              <div className="text-xs text-green-600 flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                Update real-time aktif
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri - Galeri & Detail */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {/* Galeri Gambar */}
              <div className="relative">
                <img 
                  src={images[activeImageIndex]} 
                  alt={property.title} 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className={`${categoryInfo.className} text-white px-3 py-1.5 rounded-full`}>
                    {categoryInfo.text}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="bg-white/80 dark:bg-gray-800/80 hover:bg-white rounded-full"
                  >
                    <Heart className="h-5 w-5 text-gray-700" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="bg-white/80 dark:bg-gray-800/80 hover:bg-white rounded-full"
                  >
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>
              </div>
              
              {/* Thumbnail images */}
              {images.length > 1 && (
                <div className="flex overflow-x-auto p-2 gap-2 hide-scrollbar">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} thumbnail ${index + 1}`}
                      className={`h-16 w-24 object-cover cursor-pointer rounded ${
                        index === activeImageIndex 
                          ? "border-2 border-orange-500" 
                          : "border border-gray-200 opacity-80 hover:opacity-100"
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    />
                  ))}
                </div>
              )}
              
              {/* Detail Properti */}
              <div className="p-6">
                <div className="mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{property.location}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <div>
                    <p className="text-3xl font-bold text-orange-500 mb-1">
                      Rp {formatCurrency(property.price)}
                    </p>
                    <p className="text-sm text-gray-500">Harga Cash</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-1">
                      Rp {formatCurrency(property.price * 0.3)}
                    </p>
                    <p className="text-sm text-gray-500">DP Kredit</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  
                </div>
                
                {/* Tabs for different content sections */}
                <Tabs defaultValue="deskripsi" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
                    <TabsTrigger value="fitur">Fitur</TabsTrigger>
                    <TabsTrigger value="spesifikasi">Spesifikasi</TabsTrigger>
                    <TabsTrigger value="lokasi">Lokasi</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="deskripsi" className="space-y-4">
                    <div className="prose dark:prose-invert max-w-none">
                      {content?.description ? (
                        <div dangerouslySetInnerHTML={{ __html: content.description }} />
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{property.description || 
                          "Properti premium dengan lokasi strategis dan akses mudah. Investasi properti dengan potensi nilai yang terus meningkat. Hubungi kami untuk informasi lebih lanjut."}</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="fitur">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getFormattedFeatures().map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="spesifikasi">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(getPropertySpecifications()).map(([key, value], index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{key}</p>
                          <p className="font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="lokasi">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-lg mb-4">
                      <div className="text-center">
                        <MapPin className="h-10 w-10 text-gray-400 mb-2 mx-auto" />
                        <p className="text-gray-500 dark:text-gray-400">Peta lokasi akan segera tersedia</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium mb-1">Alamat Lengkap</h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {property.address || `${property.location}, Indonesia`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Kolom Kanan - Aksi & Kontak */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Hubungi Agen</h3>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4 overflow-hidden">
                    <img
                      src="https://source.unsplash.com/random/100x100?person"
                      alt="Property Agent"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Tim Marketing Rekaland</h4>
                    <p className="text-sm text-gray-500">Properti Consultant</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
                    onClick={handleContactAgent}
                  >
                    <Phone className="h-5 w-5" />
                    Hubungi via WhatsApp
                  </Button>
                  
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white gap-2"
                  >
                    <Calendar className="h-5 w-5" />
                    Jadwalkan Kunjungan
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Rekomendasi Pembiayaan</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">DP 30%</span>
                      <span className="font-medium">Rp {formatCurrency(property.price * 0.3)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Cicilan per bulan</span>
                      <span className="font-medium">Rp {formatCurrency((property.price - (property.price * 0.3)) / 60)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Tenor</span>
                      <span className="font-medium">5 tahun</span>
                    </div>
                    
                    <div className="pt-2 text-xs text-gray-500">
                      * Estimasi, hubungi agen untuk informasi lebih detail
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Fitur Properti</h3>
                
                <div className="space-y-3">
                  {getFormattedFeatures().slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="link" 
                  className="text-orange-500 pl-0 mt-2"
                  onClick={() => setActiveTab("fitur")}
                >
                  Lihat semua fitur <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
