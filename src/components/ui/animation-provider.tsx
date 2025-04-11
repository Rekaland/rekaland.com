
import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimationProviderProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  type?: "fade" | "slide" | "scale" | "float" | "3d-rotate" | "3d-tilt";
  direction?: "left" | "right" | "up" | "down";
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  type = "fade",
  direction = "up"
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
      if (direction === "left") {
        variants = {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration, delay } }
        };
      } else if (direction === "right") {
        variants = {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0, transition: { duration, delay } }
        };
      } else if (direction === "up") {
        variants = {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration, delay } }
        };
      } else { // down is default
        variants = {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration, delay } }
        };
      }
      break;
    case "scale":
      variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration, delay } }
      };
      break;
    case "3d-rotate":
      variants = {
        hidden: { opacity: 0, rotateX: 15, perspective: 500 },
        visible: { 
          opacity: 1, 
          rotateX: 0,
          transition: { 
            duration, 
            delay,
            type: "spring",
            stiffness: 100
          } 
        }
      };
      break;
    case "3d-tilt":
      return (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration, delay }}
          whileHover={{ 
            scale: 1.02,
            rotateY: 5,
            rotateX: -5,
            transition: { duration: 0.2 }
          }}
          style={{ perspective: 1000 }}
        >
          {children}
        </motion.div>
      );
    case "float":
      return (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay
            },
            opacity: { duration, delay }
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
