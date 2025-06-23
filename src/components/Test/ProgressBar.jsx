import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total, progress, questions = [], answers = {} }) => {
  // Calculăm procentajul de progres
  const percentage = progress?.percentage || (current / total) * 100;

  return (
    <div className="w-full py-3 lg:py-4">
      {/* HUD Progress Container */}
      <div className="relative">
        {/* Translucent background panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 via-slate-800/20 to-slate-900/10 backdrop-blur-sm rounded-lg border border-cyan-400/10" />
        
        {/* Main HUD Progress Bar */}
        <div className="relative h-3 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent rounded-full border border-cyan-400/30 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Atmospheric background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/10 to-purple-500/5 rounded-full" />
          
          {/* Floating light particles */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <motion.div
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
              animate={{
                x: ['-10px', '110%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: 0
              }}
              style={{ top: '25%' }}
            />
            <motion.div
              className="absolute w-0.5 h-0.5 bg-blue-400/40 rounded-full"
              animate={{
                x: ['-5px', '105%'],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
              style={{ top: '75%' }}
            />
          </div>
          
          {/* Progress fill with holographic effect */}
          <motion.div
            className="relative h-full rounded-full shadow-2xl overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut"
            }}
            style={{
              background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.8) 0%, rgba(59, 130, 246, 0.9) 30%, rgba(124, 58, 237, 0.8) 70%, rgba(236, 72, 153, 0.7) 100%)',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Holographic shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              initial={{ x: '-150%' }}
              animate={{ x: '150%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            />
            
            {/* Energy pulse */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-transparent to-purple-400/30 rounded-full"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Top highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
          </motion.div>
          
          {/* Progress segments overlay */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: total }, (_, index) => (
              <div
                key={index}
                className="flex-1 border-r border-slate-600/30 last:border-r-0"
              />
            ))}
          </div>
        </div>

        {/* Holographic progress indicator */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
          initial={{ left: '0%' }}
          animate={{ left: `${percentage}%` }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut"
          }}
        >
          <div className="relative">
            {/* Core energy sphere */}
            <motion.div
              className="w-4 h-4 rounded-full border border-cyan-400/70 shadow-2xl backdrop-blur-sm"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(59, 130, 246, 0.6) 50%, rgba(124, 58, 237, 0.4) 100%)',
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.7), inset 0 0 8px rgba(255, 255, 255, 0.3)'
              }}
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Energy rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400/40"
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.6, 0, 0.6],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-full border border-purple-400/30"
              animate={{
                scale: [1, 3, 1],
                opacity: [0.4, 0, 0.4],
                rotate: [360, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1
              }}
            />
            
            {/* Central light */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                opacity: [0.8, 1, 0.8],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Enhanced HUD side elements */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
          <motion.div
            className="flex flex-col space-y-1"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-2 bg-gradient-to-b from-cyan-400/70 to-cyan-400/20 rounded-full backdrop-blur-sm" />
            <div className="w-0.5 h-1 bg-cyan-400/50 rounded-full" />
          </motion.div>
        </div>
        
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <motion.div
            className="flex flex-col space-y-1"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <div className="w-1 h-2 bg-gradient-to-b from-purple-400/70 to-purple-400/20 rounded-full backdrop-blur-sm" />
            <div className="w-0.5 h-1 bg-purple-400/50 rounded-full" />
          </motion.div>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute -top-1 left-0">
          <motion.div
            className="w-2 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent rounded-full"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="absolute -top-1 right-0">
          <motion.div
            className="w-2 h-0.5 bg-gradient-to-l from-purple-400/50 to-transparent rounded-full"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>
      </div>


    </div>
  );
};

export default ProgressBar; 