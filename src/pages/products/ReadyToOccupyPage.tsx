
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { MapPin, ArrowRight, Info, Check } from "lucide-react";

const ReadyToOccupyPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Sample data for kavling siap huni
  const readyToOccupyLots = [
    {
      id: 1,
      title: "Villa Asri Bali",
      location: "Tabanan, Bali",
      price: "Rp1.2 milyar",
      area: "250 m²",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Fully furnished", "View pegunungan", "Keamanan 24 jam"]
    },
    {
      id: 2,
      title: "Rumah Mewah Jakarta Selatan",
      location: "Kebayoran Baru, Jakarta Selatan",
      price: "Rp3.5 milyar",
      area: "350 m²",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["5 kamar tidur", "Smart home", "Kolam renang"]
    },
    {
      id: 3,
      title: "Apartemen Mewah Surabaya",
      location: "Surabaya, Jawa Timur",
      price: "Rp900 juta",
      area: "90 m²",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["2 kamar tidur", "Fasilitas lengkap", "View kota"]
    },
    {
      id: 4,
      title: "Cluster Modern BSD",
      location: "BSD City, Tangerang Selatan",
      price: "Rp1.5 milyar",
      area: "180 m²",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["One gate system", "Taman bermain", "Clubhouse"]
    },
    {
      id: 5,
      title: "Rumah Premium Sentul",
      location: "Sentul City, Bogor",
      price: "Rp2.2 milyar",
      area: "300 m²",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["4 kamar tidur", "Udara sejuk", "View golf"]
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:text-rekaland-orange">Beranda</Link>
              <span>/</span>
              <Link to="/produk" className="hover:text-rekaland-orange">Produk</Link>
              <span>/</span>
              <span className="text-rekaland-orange">Kavling Siap Huni</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Kavling Siap Huni</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Properti yang sudah selesai dibangun dan siap untuk dihuni, dengan desain modern dan fasilitas lengkap.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/produk">
              <Button variant="outline" className="border-rekaland-orange text-rekaland-orange hover:bg-rekaland-orange hover:text-white">
                Lihat Semua Kategori
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-rekaland-orange mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Tentang Kavling Siap Huni</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Kavling siap huni adalah properti yang telah selesai dibangun dan siap untuk ditempati. 
                Anda dapat langsung menempati properti tanpa perlu renovasi atau pembangunan lebih lanjut.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {readyToOccupyLots.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0">
              <div className="relative h-60">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-3 left-3 bg-rekaland-orange text-white px-3 py-1 text-sm rounded-full">
                  Siap Huni
                </span>
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
                  <Link to={`/produk/detail/${property.id}`}>
                    <Button className="w-full bg-gray-100 text-rekaland-black hover:bg-rekaland-orange hover:text-white transition-colors">
                      Lihat Detail <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ReadyToOccupyPage;
