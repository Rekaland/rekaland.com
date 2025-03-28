
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import PropertyCategoriesSection from "@/components/home/PropertyCategoriesSection";
import FeaturedPropertiesSection from "@/components/home/FeaturedPropertiesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import WelcomeToast from "@/components/home/WelcomeToast";

const Index = () => {
  return (
    <Layout>
      {/* Welcome Toast Component */}
      <WelcomeToast />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Property Categories Section */}
      <PropertyCategoriesSection />
      
      {/* Featured Properties Section */}
      <FeaturedPropertiesSection />
      
      {/* Why Choose Us Section */}
      <WhyChooseUsSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CtaSection />
    </Layout>
  );
};

export default Index;
