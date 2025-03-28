
import { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/products/PropertyCard";

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

const FeaturedPropertiesSection: FC = () => {
  // Featured properties data
  const featuredProperties: FeaturedProperty[] = [
    {
      id: 1,
      title: "Kavling Premium Cisarua",
      location: "Cisarua, Lampung Selatan",
      type: "Kavling Kosongan",
      price: "Rp350 juta",
      area: "120 m²",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Akses tol", "Dekat fasilitas umum", "SHM"]
    },
    {
      id: 2,
      title: "Kavling Siap Bangun Lampung",
      location: "Lampung Selatan",
      type: "Kavling Kosongan",
      price: "Rp425 juta",
      area: "150 m²",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Area berkembang", "ROI tinggi", "Bebas banjir"]
    },
    {
      id: 3,
      title: "Rumah Setengah Jadi Cisarua",
      location: "Cisarua, Lampung Selatan",
      type: "Kavling Bangunan",
      price: "Rp550 juta",
      area: "180 m²",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Struktur kokoh", "Desain modern", "Lingkungan asri"]
    },
    {
      id: 4,
      title: "Villa Siap Huni Lampung",
      location: "Cisarua, Lampung Selatan",
      type: "Kavling Siap Huni",
      price: "Rp1.2 milyar",
      area: "250 m²",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700",
      features: ["Fully furnished", "View pegunungan", "Keamanan 24 jam"]
    }
  ];

  const handleViewAllClick = () => {
    window.location.href = "/produk";
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Properti <span className="text-rekaland-orange">Unggulan</span></h2>
          <Button 
            onClick={handleViewAllClick}
            variant="ghost" 
            className="text-rekaland-orange hover:bg-orange-50"
          >
            Lihat Semua <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
