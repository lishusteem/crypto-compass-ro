import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CompassVisualization = ({ results, size = 600, interactive = true, showLabels = true }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial');

  const padding = 60;
  const chartSize = size - (padding * 2);
  const centerX = size / 2;
  const centerY = size / 2;

  // Convertim scorurile (-100 la +100) la poziții pe matrice
  // results.scores conține valorile calculate din calculateResults
  const centralizationScore = results.scores?.raw?.centralization || 0;
  const publicGoodScore = results.scores?.raw?.privatePublic || 0;
  
  const xPosition = centerX + (centralizationScore / 100) * (chartSize / 2);
  const yPosition = centerY - (publicGoodScore / 100) * (chartSize / 2);

  useEffect(() => {
    // Secvența de animații
    const timer1 = setTimeout(() => setAnimationPhase('compass'), 500);
    const timer2 = setTimeout(() => setAnimationPhase('position'), 1500);
    const timer3 = setTimeout(() => setAnimationPhase('complete'), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Configurația culorilor pentru zonele compass-ului
  const quadrantColors = {
    topLeft: { fill: 'rgba(59, 130, 246, 0.08)', stroke: 'rgba(59, 130, 246, 0.2)' }, // Albastru
    topRight: { fill: 'rgba(124, 58, 237, 0.08)', stroke: 'rgba(124, 58, 237, 0.2)' }, // Mov
    bottomLeft: { fill: 'rgba(249, 115, 22, 0.08)', stroke: 'rgba(249, 115, 22, 0.2)' }, // Portocaliu
    bottomRight: { fill: 'rgba(34, 197, 94, 0.08)', stroke: 'rgba(34, 197, 94, 0.2)' }, // Verde
  };

  // Labels pentru axe
  const axisLabels = {
    top: 'Bun Public',
    bottom: 'Bun Privat',
    left: 'Descentralizat',
    right: 'Centralizat'
  };

  // Labels pentru quadrante
  const quadrantLabels = [
    { x: centerX - chartSize * 0.25, y: centerY - chartSize * 0.25, text: 'Descentralizat\nBun Public', color: 'rgb(59, 130, 246)' },
    { x: centerX + chartSize * 0.25, y: centerY - chartSize * 0.25, text: 'Centralizat\nBun Public', color: 'rgb(124, 58, 237)' },
    { x: centerX - chartSize * 0.25, y: centerY + chartSize * 0.25, text: 'Descentralizat\nBun Privat', color: 'rgb(249, 115, 22)' },
    { x: centerX + chartSize * 0.25, y: centerY + chartSize * 0.25, text: 'Centralizat\nBun Privat', color: 'rgb(34, 197, 94)' }
  ];

  // Grid lines configuration
  const gridLines = [];
  for (let i = -4; i <= 4; i++) {
    const offset = (i / 4) * (chartSize / 2);
    // Vertical lines
    gridLines.push({
      x1: centerX + offset,
      y1: centerY - chartSize / 2,
      x2: centerX + offset,
      y2: centerY + chartSize / 2,
      opacity: i === 0 ? 0.6 : 0.2
    });
    // Horizontal lines
    gridLines.push({
      x1: centerX - chartSize / 2,
      y1: centerY + offset,
      x2: centerX + chartSize / 2,
      y2: centerY + offset,
      opacity: i === 0 ? 0.6 : 0.2
    });
  }

  return (
    <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Definitions for gradients and filters */}
        <defs>
          <radialGradient id="compassGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.05)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0.01)" />
          </radialGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>

        {/* Matrix background */}
        <motion.rect
          x={centerX - chartSize / 2}
          y={centerY - chartSize / 2}
          width={chartSize}
          height={chartSize}
          fill="rgba(15, 23, 42, 0.4)"
          stroke="rgba(156, 163, 175, 0.3)"
          strokeWidth="2"
          rx="8"
          initial={{ scale: 0, opacity: 0 }}
          animate={animationPhase !== 'initial' ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Quadrante colorate */}
        {animationPhase !== 'initial' && (
          <>
            {/* Top Left - Descentralizat/Public */}
            <motion.rect
              x={centerX - chartSize / 2}
              y={centerY - chartSize / 2}
              width={chartSize / 2}
              height={chartSize / 2}
              fill={quadrantColors.topLeft.fill}
              stroke={quadrantColors.topLeft.stroke}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            {/* Top Right - Centralizat/Public */}
            <motion.rect
              x={centerX}
              y={centerY - chartSize / 2}
              width={chartSize / 2}
              height={chartSize / 2}
              fill={quadrantColors.topRight.fill}
              stroke={quadrantColors.topRight.stroke}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />

            {/* Bottom Left - Descentralizat/Privat */}
            <motion.rect
              x={centerX - chartSize / 2}
              y={centerY}
              width={chartSize / 2}
              height={chartSize / 2}
              fill={quadrantColors.bottomLeft.fill}
              stroke={quadrantColors.bottomLeft.stroke}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />

            {/* Bottom Right - Centralizat/Privat */}
            <motion.rect
              x={centerX}
              y={centerY}
              width={chartSize / 2}
              height={chartSize / 2}
              fill={quadrantColors.bottomRight.fill}
              stroke={quadrantColors.bottomRight.stroke}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </>
        )}

        {/* Grid lines */}
        {animationPhase !== 'initial' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {gridLines.map((line, index) => (
              <motion.line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="rgba(156, 163, 175, 0.4)"
                strokeWidth={line.opacity > 0.4 ? "2" : "1"}
                opacity={line.opacity}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.6 }}
              />
            ))}
          </motion.g>
        )}

        {/* Center point */}
        {animationPhase !== 'initial' && (
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="3"
            fill="rgba(156, 163, 175, 0.6)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          />
        )}

        {/* Result position indicator */}
        {animationPhase === 'position' || animationPhase === 'complete' ? (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.5, 
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >


            {/* Main position circle */}
            <motion.circle
              cx={xPosition}
              cy={yPosition}
              r={isHovering ? "16" : "14"}
              fill="rgb(249, 115, 22)"
              filter="url(#glow)"
              className="cursor-pointer"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Inner circle */}
            <motion.circle
              cx={xPosition}
              cy={yPosition}
              r="8"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            />

            {/* Center dot */}
            <motion.circle
              cx={xPosition}
              cy={yPosition}
              r="3"
              fill="rgb(249, 115, 22)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            />

            {/* Position coordinates tooltip */}
            {isHovering && interactive && (
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <rect
                  x={xPosition - 50}
                  y={yPosition - 50}
                  width="100"
                  height="30"
                  rx="15"
                  fill="rgba(15, 23, 42, 0.95)"
                  stroke="rgba(249, 115, 22, 0.8)"
                  strokeWidth="2"
                />
                <text
                  x={xPosition}
                  y={yPosition - 32}
                  textAnchor="middle"
                  className="text-sm fill-cyan-400 font-bold"
                >
                  ({Math.round(centralizationScore)}, {Math.round(publicGoodScore)})
                </text>
              </motion.g>
            )}
          </motion.g>
        ) : null}

        {/* Axis labels */}
        {showLabels && animationPhase !== 'initial' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {/* Top label */}
            <text
              x={centerX}
              y={centerY - chartSize / 2 - 20}
              textAnchor="middle"
              className="text-sm font-bold fill-cyan-400"
            >
              {axisLabels.top}
            </text>

            {/* Bottom label */}
            <text
              x={centerX}
              y={centerY + chartSize / 2 + 35}
              textAnchor="middle"
              className="text-sm font-bold fill-cyan-400"
            >
              {axisLabels.bottom}
            </text>

            {/* Left label */}
            <text
              x={centerX - chartSize / 2 - 25}
              y={centerY + 5}
              textAnchor="middle"
              className="text-sm font-bold fill-cyan-400"
              transform={`rotate(-90, ${centerX - chartSize / 2 - 25}, ${centerY + 5})`}
            >
              {axisLabels.left}
            </text>

            {/* Right label */}
            <text
              x={centerX + chartSize / 2 + 25}
              y={centerY + 5}
              textAnchor="middle"
              className="text-sm font-bold fill-cyan-400"
              transform={`rotate(90, ${centerX + chartSize / 2 + 25}, ${centerY + 5})`}
            >
              {axisLabels.right}
            </text>

            {/* Scale labels */}
            {[-100, -50, 0, 50, 100].map((value) => (
              <g key={value}>
                {/* Horizontal scale */}
                <text
                  x={centerX + (value / 100) * (chartSize / 2)}
                  y={centerY + chartSize / 2 + 15}
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  {value}
                </text>
                {/* Vertical scale */}
                <text
                  x={centerX - chartSize / 2 - 10}
                  y={centerY - (value / 100) * (chartSize / 2) + 4}
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  {value}
                </text>
              </g>
            ))}
          </motion.g>
        )}

        {/* Quadrant labels */}
        {showLabels && animationPhase === 'complete' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {quadrantLabels.map((label, index) => (
              <text
                key={index}
                x={label.x}
                y={label.y}
                textAnchor="middle"
                className="text-xs font-medium opacity-60"
                fill={label.color}
              >
                {label.text.split('\n').map((line, lineIndex) => (
                  <tspan key={lineIndex} x={label.x} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
            ))}
          </motion.g>
        )}
      </svg>


    </div>
  );
};

export default CompassVisualization; 