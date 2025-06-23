import React from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
  // Generate random positions and animations for particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // 2-6px
    delay: Math.random() * 10, // 0-10s delay
    duration: Math.random() * 20 + 15, // 15-35s duration
    startX: Math.random() * 100, // 0-100% of screen width
    startY: Math.random() * 100, // 0-100% of screen height
    opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
    color: ['cyan', 'blue', 'purple', 'indigo'][Math.floor(Math.random() * 4)]
  }));

  const floatVariants = {
    animate: (particle) => ({
      x: [0, Math.random() * 200 - 100, 0], // Float left/right
      y: [0, Math.random() * 200 - 100, 0], // Float up/down
      rotate: [0, 360],
      scale: [1, 1.5, 1],
      transition: {
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
        ease: "linear"
      }
    })
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-${particle.color}-400`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(${
              particle.color === 'cyan' ? '6, 182, 212' :
              particle.color === 'blue' ? '59, 130, 246' :
              particle.color === 'purple' ? '139, 92, 246' :
              '99, 102, 241'
            }, 0.3)`
          }}
          variants={floatVariants}
          animate="animate"
          custom={particle}
        />
      ))}
      
      {/* Additional geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-3/4 w-8 h-8"
        animate={{
          rotate: 45,
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full border border-cyan-400/20 transform rotate-45" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6"
        animate={{
          rotate: -90,
          x: [0, 20, 0],
          opacity: [0.1, 0.4, 0.1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      >
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      </motion.div>
    </div>
  );
};

export default FloatingParticles; 