
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedPropertiesSection from '@/components/home/FeaturedPropertiesSection';
import PropertyCategoriesSection from '@/components/home/PropertyCategoriesSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import WelcomeToast from '@/components/home/WelcomeToast';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <MainLayout>
      <WelcomeToast />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <HeroSection />
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <PropertyCategoriesSection />
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <FeaturedPropertiesSection />
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <WhyChooseUsSection />
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <TestimonialsSection />
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <CtaSection />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default HomePage;
