
import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimationProviderProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  type?: "fade" | "slide" | "scale" | "float";
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  type = "fade"
}) => {
  let variants: Variants = {};
  
  switch (type) {
    case "fade":
      variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration, delay } }
      };
      break;
    case "slide":
      variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration, delay } }
      };
      break;
    case "scale":
      variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration, delay } }
      };
      break;
    case "float":
      return (
        <motion.div
          className={className}
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay 
          }}
        >
          {children}
        </motion.div>
      );
  }
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimationProvider;
