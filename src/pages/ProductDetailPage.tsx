
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ProductBreadcrumb } from '@/components/products/ProductBreadcrumb';
import { PropertyInfoSection } from '@/components/products/PropertyInfoSection';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data for the property info section
  const propertyInfo = {
    title: `Hunian ${id || 'Premium'} Tipe Eksklusif`,
    description: "Hunian premium dengan desain modern dan fasilitas lengkap. Lokasi strategis dengan akses mudah ke pusat kota.",
    features: [
      "Luas tanah 150m²",
      "Bangunan 2 lantai",
      "3 kamar tidur",
      "2 kamar mandi",
      "Carport 2 mobil",
      "Taman belakang",
      "Keamanan 24 jam",
      "Dekat dengan fasilitas umum"
    ]
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumb 
          paths={[
            { name: 'Beranda', path: '/', active: false },
            { name: 'Produk', path: '/produk', active: false },
            { name: `Detail Produk ${id}`, path: '', active: true }
          ]} 
        />
        
        <div className="mt-8">
          <PropertyInfoSection 
            title={propertyInfo.title}
            description={propertyInfo.description}
            features={propertyInfo.features}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
