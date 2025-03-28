
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  // Show welcome toast if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        toast({
          title: "Selamat Datang",
          description: `Halo, ${user.name || "Pengguna"}! Senang melihat Anda kembali.`,
          duration: 2000,
        });
        setShowWelcome(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, toast]);

  // Featured properties data
  const featuredProperties = [
    {
      id: 1,
      title: "Kavling Premium Cisauk",
      location: "Cisauk, Tangerang",
      type: "Kavling Kosongan",
      price: "Rp350 juta",
      area: "120 m²",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZGV2ZWxvcGVyc3x8fHx8fDE3MjE0NTk3Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Akses tol", "Dekat stasiun KRL", "SHM"]
    },
    {
      id: 2,
      title: "Kavling Siap Bangun Serpong",
      location: "Serpong, Tangerang Selatan",
      type: "Kavling Kosongan",
      price: "Rp425 juta",
      area: "150 m²",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Dekat kampus", "Area komersial", "Bebas banjir"]
    },
    {
      id: 3,
      title: "Rumah Setengah Jadi Cibinong",
      location: "Cibinong, Bogor",
      type: "Kavling Setengah Jadi",
      price: "Rp550 juta",
      area: "180 m²",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Struktur kokoh", "Desain modern", "Lingkungan asri"]
    },
    {
      id: 4,
      title: "Villa Siap Huni Sentul",
      location: "Sentul, Bogor",
      type: "Kavling Siap Huni",
      price: "Rp1.2 milyar",
      area: "250 m²",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Fully furnished", "View pegunungan", "Keamanan 24 jam"]
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Dian Sastro",
      role: "Pengusaha",
      text: "Membeli tanah kavling melalui Rekaland adalah keputusan terbaik saya. Prosesnya cepat, transparan, dan mereka membantu dengan semua dokumen yang diperlukan.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Rizky Febian",
      role: "Musisi",
      text: "Sebagai investor properti pemula, saya sangat terbantu dengan konsultasi yang diberikan tim Rekaland. Mereka memberikan pilihan investasi yang sesuai dengan budget saya.",
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      name: "Maudy Ayunda",
      role: "Akademisi",
      text: "Lokasi kavling yang ditawarkan Rekaland sangat strategis dan memiliki potensi kenaikan nilai yang menjanjikan. Sangat direkomendasikan!",
      image: "https://i.pravatar.cc/150?img=3"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1500")' }}>
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Tanah Kavling Premium <span className="text-rekaland-orange">Untuk Investasi Masa Depan</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
            Dapatkan kavling strategis dengan harga terbaik dan legalitas terjamin untuk kebutuhan investasi atau hunian impian Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/produk/kavling-kosongan">
              <Button size="lg" className="bg-rekaland-orange hover:bg-orange-600 rounded-md text-lg px-8">
                Jelajahi Kavling
              </Button>
            </Link>
            <Link to="/tentang">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-rekaland-black rounded-md text-lg px-8">
                Tentang Kami
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pilihan Kavling <span className="text-rekaland-orange">Untuk Anda</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami menyediakan berbagai jenis kavling yang dapat disesuaikan dengan kebutuhan dan budget Anda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover-scale card-shadow border-0">
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" alt="Kavling Kosongan" className="w-full h-56 object-cover" />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3">Kavling Kosongan</h3>
                <p className="text-gray-600 mb-4">Tanah kavling siap bangun dengan sertifikat legal yang dapat Anda kembangkan sesuai keinginan.</p>
                <Link to="/produk/kavling-kosongan" className="flex items-center font-medium text-rekaland-orange">
                  Lihat Kavling <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover-scale card-shadow border-0">
              <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" alt="Kavling Setengah Jadi" className="w-full h-56 object-cover" />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3">Kavling Setengah Jadi</h3>
                <p className="text-gray-600 mb-4">Kavling dengan struktur bangunan dasar yang dapat Anda selesaikan sesuai desain pilihan.</p>
                <Link to="/produk/kavling-setengah-jadi" className="flex items-center font-medium text-rekaland-orange">
                  Lihat Kavling <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover-scale card-shadow border-0">
              <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" alt="Kavling Siap Huni" className="w-full h-56 object-cover" />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3">Kavling Siap Huni</h3>
                <p className="text-gray-600 mb-4">Rumah dan bangunan komersial yang sudah jadi dan siap untuk dihuni atau digunakan.</p>
                <Link to="/produk/kavling-siap-huni" className="flex items-center font-medium text-rekaland-orange">
                  Lihat Kavling <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Properti <span className="text-rekaland-orange">Unggulan</span></h2>
            <Link to="/produk" className="flex items-center text-rekaland-orange hover:underline">
              Lihat Semua <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover-scale card-shadow border-0">
                <div className="relative">
                  <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                  <span className="absolute top-3 left-3 bg-rekaland-orange text-white px-3 py-1 text-sm rounded-full">
                    {property.type}
                  </span>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center mb-3 text-gray-500">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <span className="font-bold text-rekaland-orange">{property.price}</span>
                    <span className="text-gray-500">{property.area}</span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 mt-2">
                    <div className="grid grid-cols-1 gap-1">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Check size={14} className="text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link to={`/produk/detail/${property.id}`} className="block text-center mt-4">
                      <Button className="w-full bg-gray-100 text-rekaland-black hover:bg-rekaland-orange hover:text-white transition-colors">
                        Detail Properti
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-rekaland-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih <span className="text-rekaland-orange">Rekaland?</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Kami berkomitmen menyediakan properti berkualitas dengan proses yang transparan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 hover:bg-black/20 rounded-lg transition-all duration-300">
              <div className="bg-rekaland-orange bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-rekaland-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Legalitas Terjamin</h3>
              <p className="text-gray-300">Semua properti kami memiliki dokumen legal yang lengkap dan terjamin keabsahannya.</p>
            </div>
            
            <div className="text-center p-6 hover:bg-black/20 rounded-lg transition-all duration-300">
              <div className="bg-rekaland-orange bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-rekaland-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lokasi Strategis</h3>
              <p className="text-gray-300">Properti kami berada di lokasi dengan prospek pertumbuhan nilai yang tinggi.</p>
            </div>
            
            <div className="text-center p-6 hover:bg-black/20 rounded-lg transition-all duration-300">
              <div className="bg-rekaland-orange bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-rekaland-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Konsultasi Gratis</h3>
              <p className="text-gray-300">Tim kami siap memberikan konsultasi dan panduan untuk setiap kebutuhan properti Anda.</p>
            </div>
            
            <div className="text-center p-6 hover:bg-black/20 rounded-lg transition-all duration-300">
              <div className="bg-rekaland-orange bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-rekaland-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Proses Mudah</h3>
              <p className="text-gray-300">Kami menyediakan layanan pengurusan dokumen dan proses jual beli yang mudah dan cepat.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/tentang">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-rekaland-black">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Apa Kata <span className="text-rekaland-orange">Klien Kami</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Pengalaman dan cerita sukses dari klien yang telah berinvestasi bersama Rekaland</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="text-center p-8 border-0 card-shadow hover-scale">
                <div className="mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="inline-block w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div className="text-left">
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rekaland-orange">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-white">
              <h2 className="text-3xl font-bold mb-2">Siap Untuk Berinvestasi?</h2>
              <p className="text-white text-opacity-90 text-lg">Konsultasikan kebutuhan properti Anda dengan tim ahli kami sekarang.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontak">
                <Button size="lg" className="bg-white text-rekaland-orange hover:bg-gray-100 min-w-40">
                  Hubungi Kami
                </Button>
              </Link>
              <Link to="/produk">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-rekaland-orange min-w-40">
                  Lihat Katalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
