import React, { useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Card animat cu efecte de glow și tilt 3D
 */
const GlowCard = ({
  children,
  className = '',
  glowColor = 'orange', // orange, blue, purple, custom
  intensity = 'medium', // low, medium, high
  tilt = false,
  onClick,
  hover = true,
  gradient = false,
  padding = 'md', // sm, md, lg, xl
  ...props
}) => {
  const cardRef = useRef(null);
  
  // Clase de bază
  const baseClasses = `
    relative rounded-xl backdrop-blur-sm
    border border-white/10 transition-all duration-300
    transform-gpu perspective-1000
  `;
  
  // Culori de glow
  const glowColors = {
    orange: 'rgba(249, 115, 22, 0.4)',
    blue: 'rgba(59, 130, 246, 0.4)', 
    purple: 'rgba(124, 58, 237, 0.4)',
    custom: 'rgba(249, 115, 22, 0.4)', // default fallback
  };
  
  // Intensitatea glow-ului
  const intensities = {
    low: '0 0 10px',
    medium: '0 0 20px',
    high: '0 0 30px',
  };
  
  // Padding-uri
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  // Background-uri
  const background = gradient 
    ? 'bg-gradient-to-br from-primary-secondary to-primary-bg'
    : 'bg-primary-secondary/80';
  
  // Combinăm clasele
  const cardClasses = `
    ${baseClasses}
    ${background}
    ${paddings[padding]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;
  
  // Animații pentru hover
  const cardVariants = {
    rest: {
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: hover ? {
      scale: 1.02,
      transition: { duration: 0.3 }
    } : {},
    tap: onClick ? {
      scale: 0.98,
      transition: { duration: 0.1 }
    } : {}
  };
  
  // Handler pentru mouse move (efect tilt)
  const handleMouseMove = (e) => {
    if (!tilt || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -10;
    const rotateY = (mouseX / (rect.width / 2)) * 10;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      scale(1.02)
    `;
  };
  
  // Handler pentru mouse leave
  const handleMouseLeave = () => {
    if (!tilt || !cardRef.current) return;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(0deg) 
      rotateY(0deg)
      scale(1)
    `;
  };
  
  // Handler pentru click
  const handleClick = (e) => {
    if (onClick) {
      // Adăugăm un mic efect de scale la click
      if (cardRef.current) {
        cardRef.current.style.transform = `
          perspective(1000px) 
          rotateX(0deg) 
          rotateY(0deg)
          scale(0.98)
        `;
        
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.transform = `
              perspective(1000px) 
              rotateX(0deg) 
              rotateY(0deg)
              scale(1)
            `;
          }
        }, 100);
      }
      
      onClick(e);
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={cardClasses}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        boxShadow: `
          ${intensities[intensity]} ${glowColors[glowColor]},
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
      {...props}
    >
      {/* Glow effect background */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(circle at center, ${glowColors[glowColor]} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Border gradient pentru efect premium */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Conținutul cardului */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shimmer effect pe hover */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div 
          className="absolute -inset-10 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${glowColors[glowColor]} 50%, transparent 70%)`,
            transform: 'translateX(-100%)',
            animation: hover ? 'shimmer 2s infinite' : 'none',
          }}
        />
      </div>
    </motion.div>
  );
};

// Componentă specializată pentru cardurile de introducere
export const IntroCard = ({ title, description, icon: Icon, ...props }) => (
  <GlowCard {...props}>
    <div className="text-center space-y-4">
      {Icon && (
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-primary-accent-orange/20">
            <Icon size={32} className="text-primary-accent-orange" />
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-bold text-primary-text-primary">
        {title}
      </h3>
      
      <p className="text-primary-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  </GlowCard>
);

// Componentă specializată pentru rezultate
export const ResultCard = ({ children, highlight = false, ...props }) => (
  <GlowCard
    glowColor={highlight ? 'orange' : 'blue'}
    intensity={highlight ? 'high' : 'medium'}
    gradient={true}
    {...props}
  >
    {children}
  </GlowCard>
);

// CSS pentru animația shimmer (adăugat în globals.css)
const shimmerStyle = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export { shimmerStyle };
export default GlowCard; 