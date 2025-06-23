import React from 'react';
import { motion } from 'framer-motion';

/**
 * Buton animat reutilizabil cu diferite variante și efecte
 */
const AnimatedButton = ({
  children,
  onClick,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'md', // sm, md, lg, xl
  disabled = false,
  loading = false,
  icon: Icon = null,
  iconPosition = 'left', // left, right
  fullWidth = false,
  className = '',
  ...props
}) => {
  
  // Clase de bază
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-lg transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden transform-gpu
  `;
  
  // Variante de stil
  const variants = {
    primary: `
      bg-gradient-to-r from-primary-accent-orange to-primary-accent-blue
      text-white shadow-lg hover:shadow-xl
      focus:ring-primary-accent-orange
      hover:scale-105 active:scale-95
    `,
    secondary: `
      bg-primary-secondary text-primary-text-primary
      border border-primary-accent-orange/30
      hover:bg-primary-accent-orange/10 hover:border-primary-accent-orange
      focus:ring-primary-accent-orange
      hover:scale-105 active:scale-95
    `,
    outline: `
      bg-transparent text-primary-accent-orange
      border-2 border-primary-accent-orange
      hover:bg-primary-accent-orange hover:text-white
      focus:ring-primary-accent-orange
      hover:scale-105 active:scale-95
    `,
    ghost: `
      bg-transparent text-primary-text-secondary
      hover:bg-primary-secondary hover:text-primary-text-primary
      focus:ring-primary-accent-orange
      hover:scale-105 active:scale-95
    `,
  };
  
  // Dimensiuni
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };
  
  // Combinăm clasele
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  // Animații pentru hover și click
  const buttonVariants = {
    hover: {
      scale: disabled ? 1 : 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: disabled ? 1 : 0.95,
      transition: { duration: 0.1 }
    }
  };
  
  // Animație pentru ripple effect
  const rippleVariants = {
    initial: { scale: 0, opacity: 0.7 },
    animate: { scale: 4, opacity: 0 },
  };
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    
    // Ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    // Creăm elementul ripple
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(249, 115, 22, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    // Ștergem ripple-ul după animație
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Apelăm onClick-ul original
    if (onClick) onClick(e);
  };
  
  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      
      {/* Conținutul butonului */}
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && iconPosition === 'left' && (
          <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : size === 'xl' ? 28 : 20} />
        )}
        
        {children}
        
        {Icon && iconPosition === 'right' && (
          <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : size === 'xl' ? 28 : 20} />
        )}
      </div>
      
      {/* Efect de glow pentru varianta primary */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary-accent-orange to-primary-accent-blue blur-lg opacity-30 animate-glow" />
      )}
    </motion.button>
  );
};

// CSS pentru animația ripple (îl adăugăm în globals.css)
const rippleStyle = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// Exportăm și stilul pentru a fi adăugat în globals.css
export { rippleStyle };
export default AnimatedButton; 