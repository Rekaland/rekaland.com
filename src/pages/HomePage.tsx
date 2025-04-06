
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedPropertiesSection from '@/components/home/FeaturedPropertiesSection';
import PropertyCategoriesSection from '@/components/home/PropertyCategoriesSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import WelcomeToast from '@/components/home/WelcomeToast';
import AnimationProvider from '@/components/ui/animation-provider';

const HomePage = () => {
  return (
    <MainLayout>
      <WelcomeToast />
      <div className="space-y-16">
        <AnimationProvider type="fade" delay={0.3}>
          <HeroSection />
        </AnimationProvider>
        
        <AnimationProvider type="slide" delay={0.4}>
          <PropertyCategoriesSection />
        </AnimationProvider>
        
        <AnimationProvider type="scale" delay={0.5}>
          <FeaturedPropertiesSection />
        </AnimationProvider>
        
        <AnimationProvider type="fade" delay={0.6}>
          <WhyChooseUsSection />
        </AnimationProvider>
        
        <AnimationProvider type="slide" delay={0.7}>
          <TestimonialsSection />
        </AnimationProvider>
        
        <AnimationProvider type="scale" delay={0.8}>
          <CtaSection />
        </AnimationProvider>
      </div>
    </MainLayout>
  );
};

export default HomePage;
