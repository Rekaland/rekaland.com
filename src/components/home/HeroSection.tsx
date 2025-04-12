
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-cover bg-center mt-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1500")' }}>
      <div className="container mx-auto px-4 py-16 text-center text-white">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tanah Kavling Premium <span className="text-rekaland-orange">Untuk Investasi Masa Depan</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Dapatkan kavling strategis dengan harga terbaik dan legalitas terjamin untuk kebutuhan investasi atau hunian impian Anda.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/produk/kavling-kosongan">
            <Button size="lg" className="bg-rekaland-orange hover:bg-orange-600 text-white rounded-md text-lg px-8">
              Jelajahi Kavling
            </Button>
          </Link>
          <Link to="/tentang">
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:border-rekaland-orange hover:text-rekaland-orange rounded-md text-lg px-8 transition-colors duration-300">
              Tentang Kami
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
