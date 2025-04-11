import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { PropertyGridView } from '@/components/products/PropertyGridView';
import { PropertyListView } from '@/components/products/PropertyListView';
import { PropertyFilters } from '@/components/products/PropertyFilters';
import { PropertyPagination } from '@/components/products/PropertyPagination';
import { ProductCategorySection } from '@/components/products/ProductCategorySection';
import { Button } from '@/components/ui/button';
import { Grid3x3, List } from 'lucide-react';
import { useProperties } from '@/hooks/useProperties';
import { cn } from '@/lib/utils';
import { ProductBreadcrumb } from '@/components/products/ProductBreadcrumb';
import AnimationProvider from '@/components/ui/animation-provider';

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

  const { data: properties, isLoading, isError } = useProperties();

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setActiveCategory(category);
    setCurrentPage(1); // Reset page on category change
  }, [searchParams]);

  const filteredProperties = React.useMemo(() => {
    if (!properties) return [];

    let filtered = properties.filter(property => {
      const price = property.price || 0;
      const landSize = property.landSize || 0;

      const matchesCategory = activeCategory === 'all' || property.category === activeCategory;
      const matchesPriceRange = price >= priceRange.min && price <= priceRange.max;
      const matchesLandSizeRange = landSize >= landSizeRange.min && landSize <= landSizeRange.max;
      const matchesBedrooms = bedroomsFilter === null || property.bedrooms === bedroomsFilter;
      const matchesFeatured = !featuredOnly || property.isFeatured;

      return (
        matchesCategory &&
        matchesPriceRange &&
        matchesLandSizeRange &&
        matchesBedrooms &&
        matchesFeatured
      );
    });

    return filtered;
  }, [properties, activeCategory, priceRange, landSizeRange, bedroomsFilter, featuredOnly]);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProperties = React.useMemo(() => {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage, propertiesPerPage]);

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
          <ProductCategorySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </AnimationProvider>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <AnimationProvider type="slide" direction="left" delay={0.4}>
            <aside className="w-full md:w-64 flex-shrink-0">
              <PropertyFilters 
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

          <AnimationProvider type="slide" direction="right" delay={0.5}>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600">{filteredProperties.length} properti ditemukan</p>
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
              
              {viewMode === 'grid' ? (
                <PropertyGridView properties={paginatedProperties} />
              ) : (
                <PropertyListView properties={paginatedProperties} />
              )}
              
              <PropertyPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </AnimationProvider>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
