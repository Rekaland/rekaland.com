
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <img 
          src="/lovable-uploads/b486d576-e0ba-4dde-92b2-dcac9a60c681.png" 
          alt="Rekaland Logo" 
          className="h-8 md:h-10 drop-shadow-sm hover:drop-shadow-md transition-all duration-300" 
        />
      </motion.div>
    </Link>
  );
};
