
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Featured property data type
interface FeaturedProperty {
  id: number;
  title: string;
  location: string;
  type: string;
  price: string;
  area: string;
  image: string;
  features: string[];
}

const FeaturedPropertiesSection = () => {
  // Featured properties data
  const featuredProperties: FeaturedProperty[] = [
    {
      id: 1,
      title: "Kavling Premium Cisauk",
      location: "Cisauk, Tangerang",
      type: "Kavling Kosongan",
      price: "Rp350 juta",
      area: "120 m²",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
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

  return (
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
  );
};

export default FeaturedPropertiesSection;
