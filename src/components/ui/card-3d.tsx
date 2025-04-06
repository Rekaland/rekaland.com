
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  border?: boolean;
  shadow?: boolean;
  disabled?: boolean;
}

export const Card3D = ({
  children,
  className,
  intensity = 10,
  border = true,
  shadow = true,
  disabled = false
}: Card3DProps) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;
    
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
