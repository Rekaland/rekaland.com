
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { PropertyGridView } from '@/components/products/PropertyGridView';
import { PropertyListView } from '@/components/products/PropertyListView';
import { PropertyFilters } from '@/components/products/PropertyFilters';
import { PropertyPagination } from '@/components/products/PropertyPagination';
import { ProductCategorySection } from '@/components/products/ProductCategorySection';
import { Button } from '@/components/ui/button';
import { Grid3x3, List, Home, Building, Castle, MapPin } from 'lucide-react';
import { useProperties, mapDbCategoryToUrlCategory } from '@/hooks/useProperties';
import { cn, formatCurrency } from '@/lib/utils';
import { ProductBreadcrumb } from '@/components/products/ProductBreadcrumb';
import AnimationProvider from '@/components/ui/animation-provider';
import { CategoryProps } from '@/types/product';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(12);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [landSizeRange, setLandSizeRange] = useState({ min: 0, max: 1000 });
  const [bedroomsFilter, setBedroomsFilter] = useState<number | null>(null);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  
  // Using the hook directly with its existing return values
  const { properties, loading, error, refetchProperties } = useProperties();

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setActiveCategory(category);
    setCurrentPage(1); // Reset page on category change
  }, [searchParams]);

  // Sample categories data
  const categories: CategoryProps[] = [
    {
      id: "all",
      title: "Semua Properti",
      icon: <Home className="w-5 h-5 text-rekaland-orange" />,
      description: "Temukan semua properti kami di berbagai lokasi",
      path: "/produk"
    },
    {
      id: "empty_lot",
      title: "Kavling Kosongan",
      icon: <MapPin className="w-5 h-5 text-rekaland-orange" />,
      description: "Tanah kosong siap bangun sesuai keinginan",
      path: "/produk/kavling-kosongan"
    },
    {
      id: "semi_finished",
      title: "Kavling Setengah Jadi",
      icon: <Building className="w-5 h-5 text-rekaland-orange" />,
      description: "Bangunan struktur dasar telah selesai",
      path: "/produk/kavling-setengah-jadi"
    },
    {
      id: "ready_to_occupy",
      title: "Kavling Siap Huni",
      icon: <Castle className="w-5 h-5 text-rekaland-orange" />,
      description: "Rumah siap ditempati dengan berbagai pilihan",
      path: "/produk/kavling-siap-huni"
    }
  ];

  const filteredProperties = React.useMemo(() => {
    if (!properties) return [];

    let filtered = [...properties];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(property => property.category === activeCategory);
    }

    // Filter by price range
    filtered = filtered.filter(property => {
      const price = property.price || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Filter by land size
    filtered = filtered.filter(property => {
      if (!property.land_size) return true;
      return property.land_size >= landSizeRange.min && property.land_size <= landSizeRange.max;
    });

    // Filter by bedrooms
    if (bedroomsFilter !== null) {
      filtered = filtered.filter(property => property.bedrooms === bedroomsFilter);
    }

    // Filter by featured
    if (featuredOnly) {
      filtered = filtered.filter(property => property.featured);
    }

    // Sort properties
    switch (sortOption) {
      case "priceAsc":
        return filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "priceDesc":
        return filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "areaAsc":
        return filtered.sort((a, b) => (a.land_size || 0) - (b.land_size || 0));
      case "areaDesc":
        return filtered.sort((a, b) => (b.land_size || 0) - (a.land_size || 0));
      default:
        return filtered; // Default sort (newest first) is assumed to be the default order from API
    }
  }, [properties, activeCategory, priceRange, landSizeRange, bedroomsFilter, featuredOnly, searchTerm, sortOption]);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format properties to match PropertyProps interface
  const formatPropertiesForDisplay = () => {
    return filteredProperties.map(property => ({
      id: property.id,
      title: property.title,
      location: property.location,
      type: property.category === 'empty_lot' ? 'Kavling Kosongan' : 
           property.category === 'semi_finished' ? 'Kavling Setengah Jadi' : 'Kavling Siap Huni',
      price: `Rp ${formatCurrency(property.price)}`,
      priceNumeric: property.price || 0,
      dpPrice: (property.price || 0) * 0.3,
      area: property.land_size ? `${property.land_size} m²` : "120 m²",
      image: property.images?.[0] || `https://source.unsplash.com/random/300x200?property&sig=${property.id}`,
      category: mapDbCategoryToUrlCategory(property.category),
      features: [
        property.bedrooms ? `${property.bedrooms} kamar tidur` : "Akses mudah",
        property.bathrooms ? `${property.bathrooms} kamar mandi` : "Lokasi strategis",
        "Sertifikat SHM"
      ]
    }));
  };

  const paginatedProperties = React.useMemo(() => {
    const formattedProperties = formatPropertiesForDisplay();
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    return formattedProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage, propertiesPerPage]);

  const handleCategoryClick = (path: string) => {
    let categoryId = 'all';
    if (path.includes('kavling-kosongan')) categoryId = 'empty_lot';
    else if (path.includes('kavling-setengah-jadi')) categoryId = 'semi_finished';
    else if (path.includes('kavling-siap-huni')) categoryId = 'ready_to_occupy';
    setActiveCategory(categoryId);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-4 pb-12">
        <AnimationProvider type="fade" delay={0.1}>
          <ProductBreadcrumb category={activeCategory} />
        </AnimationProvider>

        <AnimationProvider type="slide" delay={0.2}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6">
            {activeCategory === 'all' ? 'Semua Properti' : 
              activeCategory === 'empty_lot' ? 'Kavling Kosongan' :
              activeCategory === 'semi_finished' ? 'Kavling Setengah Jadi' :
              'Kavling Siap Huni'}
          </h1>
        </AnimationProvider>

        <AnimationProvider type="fade" delay={0.3}>
          <ProductCategorySection 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryClick={handleCategoryClick}
          />
        </AnimationProvider>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <AnimationProvider type="slide" delay={0.4}>
            <aside className="w-full md:w-64 flex-shrink-0">
              <PropertyFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortOption={sortOption}
                setSortOption={setSortOption}
                viewMode={viewMode}
                setViewMode={setViewMode}
                handleSearch={handleSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                landSizeRange={landSizeRange}
                setLandSizeRange={setLandSizeRange}
                bedroomsFilter={bedroomsFilter}
                setBedroomsFilter={setBedroomsFilter}
                featuredOnly={featuredOnly}
                setFeaturedOnly={setFeaturedOnly}
              />
            </aside>
          </AnimationProvider>

          <AnimationProvider type="slide" delay={0.5}>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600">
                    {loading ? 'Memuat properti...' : 
                      error ? 'Gagal memuat data' : 
                      `${filteredProperties.length} properti ditemukan`}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={cn(viewMode === 'grid' ? 'bg-rekaland-orange' : '')}
                  >
                    <Grid3x3 size={18} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={cn(viewMode === 'list' ? 'bg-rekaland-orange' : '')}
                  >
                    <List size={18} />
                  </Button>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-lg">Memuat properti...</p>
                </div>
              ) : error ? (
                <div className="p-6 text-center bg-red-50 rounded-lg">
                  <p className="text-red-600">Gagal memuat data properti</p>
                  <Button 
                    variant="outline" 
                    onClick={refetchProperties}
                    className="mt-3"
                  >
                    Coba Lagi
                  </Button>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="p-6 text-center bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Tidak ada properti yang ditemukan</p>
                </div>
              ) : viewMode === 'grid' ? (
                <PropertyGridView properties={paginatedProperties} />
              ) : (
                <PropertyListView properties={paginatedProperties} />
              )}
              
              {!loading && !error && filteredProperties.length > 0 && (
                <PropertyPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </AnimationProvider>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
