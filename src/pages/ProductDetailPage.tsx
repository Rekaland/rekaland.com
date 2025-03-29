
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductBreadcrumb from '@/components/products/ProductBreadcrumb';
import PropertyInfoSection from '@/components/products/PropertyInfoSection';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumb 
          items={[
            { label: 'Beranda', path: '/' },
            { label: 'Produk', path: '/produk' },
            { label: `Detail Produk ${id}`, path: '' }
          ]} 
        />
        
        <div className="mt-8">
          <PropertyInfoSection propertyId={id || ''} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
