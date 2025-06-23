import React from 'react';
import { motion } from 'framer-motion';

const NetworkEffect = () => {
  // Network nodes positions - more dense network
  const nodes = [
    { id: 1, x: 10, y: 15, size: 2 },
    { id: 2, x: 20, y: 25, size: 1.5 },
    { id: 3, x: 30, y: 20, size: 2 },
    { id: 4, x: 40, y: 35, size: 1.5 },
    { id: 5, x: 50, y: 15, size: 2 },
    { id: 6, x: 60, y: 30, size: 1.5 },
    { id: 7, x: 70, y: 20, size: 2 },
    { id: 8, x: 80, y: 40, size: 1.5 },
    { id: 9, x: 15, y: 50, size: 1.5 },
    { id: 10, x: 25, y: 60, size: 2 },
    { id: 11, x: 35, y: 55, size: 1.5 },
    { id: 12, x: 45, y: 65, size: 2 },
    { id: 13, x: 55, y: 50, size: 1.5 },
    { id: 14, x: 65, y: 70, size: 2 },
    { id: 15, x: 75, y: 60, size: 1.5 },
    { id: 16, x: 85, y: 75, size: 2 },
    { id: 17, x: 90, y: 25, size: 1.5 },
    { id: 18, x: 5, y: 35, size: 1.5 },
    { id: 19, x: 12, y: 75, size: 2 },
    { id: 20, x: 88, y: 55, size: 1.5 },
  ];

  // Network connections - more dense connections
  const connections = [
    { from: nodes[0], to: nodes[1] },
    { from: nodes[1], to: nodes[2] },
    { from: nodes[2], to: nodes[3] },
    { from: nodes[3], to: nodes[4] },
    { from: nodes[4], to: nodes[5] },
    { from: nodes[5], to: nodes[6] },
    { from: nodes[6], to: nodes[7] },
    { from: nodes[1], to: nodes[8] },
    { from: nodes[8], to: nodes[9] },
    { from: nodes[9], to: nodes[10] },
    { from: nodes[10], to: nodes[11] },
    { from: nodes[11], to: nodes[12] },
    { from: nodes[12], to: nodes[13] },
    { from: nodes[13], to: nodes[14] },
    { from: nodes[14], to: nodes[15] },
    { from: nodes[2], to: nodes[10] },
    { from: nodes[3], to: nodes[11] },
    { from: nodes[4], to: nodes[12] },
    { from: nodes[5], to: nodes[13] },
    { from: nodes[6], to: nodes[14] },
    { from: nodes[7], to: nodes[16] },
    { from: nodes[16], to: nodes[19] },
    { from: nodes[17], to: nodes[7] },
    { from: nodes[18], to: nodes[8] },
    { from: nodes[0], to: nodes[18] },
  ];

  const nodeVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.05, 0.15, 0.05], // 70% mai puțin vizibil
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const connectionVariants = {
    animate: {
      pathLength: [0, 1, 0],
      opacity: [0, 0.08, 0], // 70% mai puțin vizibil
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const dataFlowVariants = {
    animate: {
      offsetDistance: ["0%", "100%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* SVG Network */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {/* Gradient for connections - much more subtle */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.06)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
          
          {/* Data flow gradient - much more subtle */}
          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.12)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>
        </defs>

        {/* Network connections */}
        {connections.map((connection, index) => (
          <g key={index}>
            {/* Main connection line */}
            <motion.line
              x1={`${connection.from.x}%`}
              y1={`${connection.from.y}%`}
              x2={`${connection.to.x}%`}
              y2={`${connection.to.y}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              variants={connectionVariants}
              animate="animate"
              style={{ animationDelay: `${index * 0.5}s` }}
            />
            
            {/* Data flow line */}
            <motion.line
              x1={`${connection.from.x}%`}
              y1={`${connection.from.y}%`}
              x2={`${connection.to.x}%`}
              y2={`${connection.to.y}%`}
              stroke="url(#dataFlow)"
              strokeWidth="2"
              variants={dataFlowVariants}
              animate="animate"
              style={{ animationDelay: `${index * 0.7}s` }}
            />
          </g>
        ))}
      </svg>

      {/* Network nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400/40 to-blue-400/40 shadow-lg"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size * 2}px`,
            height: `${node.size * 2}px`,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${node.size * 2}px rgba(6, 182, 212, 0.08)`,
            animationDelay: `${index * 0.3}s`
          }}
          variants={nodeVariants}
          animate="animate"
        />
      ))}

      {/* Data packets moving along connections - much more subtle */}
      {connections.slice(0, 2).map((connection, index) => (
        <motion.div
          key={`packet-${index}`}
          className="absolute w-0.5 h-0.5 bg-cyan-400/30 rounded-full"
          animate={{
            left: [`${connection.from.x}%`, `${connection.to.x}%`],
            top: [`${connection.from.y}%`, `${connection.to.y}%`],
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 1.5,
            ease: "linear"
          }}
          style={{
            boxShadow: '0 0 2px rgba(6, 182, 212, 0.15)',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Additional tech elements - much more subtle */}
      <motion.div
        className="absolute top-1/6 right-1/5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
          opacity: [0.02, 0.06, 0.02]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30">
          <circle
            cx="15"
            cy="15"
            r="10"
            fill="none"
            stroke="rgba(139, 92, 246, 0.04)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <circle
            cx="15"
            cy="15"
            r="6"
            fill="none"
            stroke="rgba(59, 130, 246, 0.06)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/5 left-1/6"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.08, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect
            x="3"
            y="3"
            width="14"
            height="14"
            fill="none"
            stroke="rgba(6, 182, 212, 0.05)"
            strokeWidth="0.5"
            transform="rotate(45 10 10)"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default NetworkEffect; 