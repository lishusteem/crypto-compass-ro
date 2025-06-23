import React from 'react';
import { motion } from 'framer-motion';

const TechBackground = () => {
  // Floating circles animation
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Pulse animation for nodes
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Line drawing animation
  const lineVariants = {
    animate: {
      pathLength: [0, 1, 0],
      opacity: [0, 0.4, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Orbit animation
  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating circles - top left */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 border border-cyan-500/20 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '0s' }}
      />
      
      <motion.div
        className="absolute top-40 left-60 w-8 h-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />

      {/* Floating circles - top right */}
      <motion.div
        className="absolute top-32 right-32 w-12 h-12 border border-purple-500/20 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />

      <motion.div
        className="absolute top-60 right-20 w-6 h-6 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '3s' }}
      />

      {/* Pulsing nodes - middle area */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-400/40 rounded-full"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '0.5s' }}
      />

      <motion.div
        className="absolute top-2/3 right-1/3 w-2 h-2 bg-purple-400/50 rounded-full"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-400/30 rounded-full"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '2.5s' }}
      />

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 100 200 Q 300 100 500 300"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="1"
          fill="none"
          variants={lineVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        
        <motion.path
          d="M 600 150 Q 400 250 200 400"
          stroke="rgba(139, 92, 246, 0.1)"
          strokeWidth="1"
          fill="none"
          variants={lineVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
        />

        <motion.path
          d="M 800 300 Q 600 200 400 500"
          stroke="rgba(6, 182, 212, 0.1)"
          strokeWidth="1"
          fill="none"
          variants={lineVariants}
          animate="animate"
          style={{ animationDelay: '5s' }}
        />
      </svg>

      {/* Orbiting elements - bottom corners */}
      <div className="absolute bottom-20 left-20">
        <motion.div
          className="relative w-20 h-20"
          variants={orbitVariants}
          animate="animate"
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400/30 rounded-full transform -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-400/40 rounded-full transform -translate-x-1/2" />
        </motion.div>
      </div>

      <div className="absolute bottom-32 right-40">
        <motion.div
          className="relative w-16 h-16"
          variants={orbitVariants}
          animate="animate"
          style={{ animationDirection: 'reverse' }}
        >
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-blue-400/35 rounded-full transform -translate-x-1/2" />
          <div className="absolute right-0 top-1/2 w-1 h-1 bg-cyan-400/25 rounded-full transform -translate-y-1/2" />
        </motion.div>
      </div>

      {/* Hexagonal tech pattern - very subtle */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <polygon
            points="60,10 90,30 90,70 60,90 30,70 30,30"
            fill="none"
            stroke="rgba(59, 130, 246, 0.05)"
            strokeWidth="1"
          />
          <polygon
            points="60,20 80,35 80,65 60,80 40,65 40,35"
            fill="none"
            stroke="rgba(139, 92, 246, 0.08)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Binary digits floating */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-xs font-mono text-cyan-400/10 select-none"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        101010
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/6 text-xs font-mono text-purple-400/10 select-none"
        animate={{
          y: [10, -10, 10],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        110011
      </motion.div>
    </div>
  );
};

export default TechBackground; 