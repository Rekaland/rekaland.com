
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  border?: boolean;
  shadow?: boolean;
  disabled?: boolean;
  hoverEffect?: "tilt" | "float" | "scale" | "glow" | "none";
}

export const Card3D = ({
  children,
  className,
  intensity = 10,
  border = true,
  shadow = true,
  disabled = false,
  hoverEffect = "tilt"
}: Card3DProps) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current || hoverEffect !== "tilt") return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * (intensity * -0.5);
    const rotateY = ((x - centerX) / centerX) * (intensity * 0.5);
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      boxShadow: shadow ? `
        ${-rotateY/2}px ${rotateX/2}px 20px rgba(0, 0, 0, 0.1),
        0 10px 20px rgba(0, 0, 0, 0.05)
      ` : 'none',
      transition: 'none'
    });
  };
  
  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0)',
      boxShadow: shadow ? '0 10px 20px rgba(0, 0, 0, 0.05)' : 'none',
      transition: 'all 0.5s ease'
    });
  };

  // If hoverEffect is not "tilt", use framer-motion instead
  if (hoverEffect !== "tilt") {
    const motionProps = {
      float: {
        whileHover: { y: -10 },
        transition: { duration: 0.4 }
      },
      scale: {
        whileHover: { scale: 1.05 },
        transition: { duration: 0.3 }
      },
      glow: {
        whileHover: { boxShadow: "0 0 20px rgba(249,115,22,0.5)" },
        transition: { duration: 0.3 }
      },
      none: {}
    };
    
    const currentProps = motionProps[hoverEffect] || {};
    
    return (
      <motion.div
        ref={cardRef}
        className={cn(
          'relative overflow-hidden', 
          border && 'border border-border',
          'rounded-xl bg-card',
          disabled ? '' : 'hover:z-10',
          className
        )}
        {...currentProps}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        'relative overflow-hidden', 
        border && 'border border-border',
        'rounded-xl bg-card',
        disabled ? '' : 'hover:z-10',
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default Card3D;
