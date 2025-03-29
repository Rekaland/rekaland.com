
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedPropertiesSection from '@/components/home/FeaturedPropertiesSection';
import PropertyCategoriesSection from '@/components/home/PropertyCategoriesSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import WelcomeToast from '@/components/home/WelcomeToast';

const HomePage = () => {
  return (
    <Layout>
      <WelcomeToast />
      <HeroSection />
      <PropertyCategoriesSection />
      <FeaturedPropertiesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CtaSection />
    </Layout>
  );
};

export default HomePage;
