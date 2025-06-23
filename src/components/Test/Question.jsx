import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext.jsx';
import { QUESTION_CONFIG } from '../../utils/constants.js';
import GlowCard from '../Shared/GlowCard.jsx';

const Question = ({ 
  question, 
  answer, 
  onAnswer, 
  questionNumber, 
  totalQuestions 
}) => {
  const { answerQuestion } = useApp();

  // Handler pentru selectarea unui răspuns
  const handleAnswerSelect = (value) => {
    answerQuestion(question.id, value);
    if (onAnswer) {
      onAnswer(question.id, value);
    }
  };

  // Opțiunile de răspuns cu culori mai clare
  const answerOptions = [
    { value: 1, label: QUESTION_CONFIG.answerScale[1], bgColor: 'rgba(220, 38, 38, 0.18)', borderColor: 'rgba(220, 38, 38, 0.4)', glowColor: 'rgba(220, 38, 38, 0.25)' },
    { value: 2, label: QUESTION_CONFIG.answerScale[2], bgColor: 'rgba(249, 115, 22, 0.18)', borderColor: 'rgba(249, 115, 22, 0.4)', glowColor: 'rgba(249, 115, 22, 0.25)' },
    { value: 3, label: QUESTION_CONFIG.answerScale[3], bgColor: 'rgba(107, 114, 128, 0.18)', borderColor: 'rgba(107, 114, 128, 0.4)', glowColor: 'rgba(107, 114, 128, 0.25)' },
    { value: 4, label: QUESTION_CONFIG.answerScale[4], bgColor: 'rgba(59, 130, 246, 0.18)', borderColor: 'rgba(59, 130, 246, 0.4)', glowColor: 'rgba(59, 130, 246, 0.25)' },
    { value: 5, label: QUESTION_CONFIG.answerScale[5], bgColor: 'rgba(34, 197, 94, 0.18)', borderColor: 'rgba(34, 197, 94, 0.4)', glowColor: 'rgba(34, 197, 94, 0.25)' },
  ];

  // Animații pentru întrebare
  const questionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  // Animații pentru opțiuni
  const optionVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const selectedValue = answer?.value;

  return (
    <motion.div
      variants={questionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="space-y-6 lg:space-y-8 xl:space-y-10"
    >
      {/* Question Card cu padding responsive */}
      <GlowCard padding="md" className="text-center">
        <motion.h2 
          className="text-lg md:text-xl font-medium text-primary-text-primary leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {question.text}
        </motion.h2>
      </GlowCard>

      {/* Answer Scale Header cu spacing responsive */}
      <motion.div 
        className="text-center space-y-2 lg:space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="text-base font-medium text-primary-text-primary">
          Cât de mult ești de acord cu această afirmație?
        </h3>
        <p className="text-primary-text-secondary text-xs">
          Selectează opțiunea care reflectă cel mai bine părerea ta
        </p>
      </motion.div>

      {/* Answer Options cu spacing îmbunătățit */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-5 gap-3 lg:gap-4 xl:gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {answerOptions.map((option, index) => {
          const isSelected = selectedValue === option.value;
          
          return (
            <motion.button
              key={option.value}
              variants={optionVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: index * 0.1 }}
              onClick={() => handleAnswerSelect(option.value)}
              className={`
                relative p-4 rounded-xl border transition-all duration-300 overflow-hidden
                focus:outline-none focus:ring-2 focus:ring-offset-2
                group cursor-pointer transform-gpu text-center
                ${isSelected 
                  ? 'ring-2 ring-primary-accent-orange focus:ring-primary-accent-orange' 
                  : 'focus:ring-primary-text-secondary/50'
                }
              `}
              style={{
                backgroundColor: option.bgColor,
                borderColor: option.borderColor,
                boxShadow: isSelected 
                  ? `inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 2px ${option.borderColor}`
                  : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Inner glow effect - luciu interior permanent */}
              <div 
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${option.glowColor} 0%, transparent 50%, ${option.glowColor} 100%)`,
                  opacity: 0.5
                }}
              />
              
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${option.glowColor} 0%, transparent 70%)`
                }}
              />
              
              {/* Text content */}
              <div className="relative z-10">
                <div className={`
                  text-sm font-medium transition-colors duration-300
                  ${isSelected 
                    ? 'text-primary-text-primary' 
                    : 'text-primary-text-secondary group-hover:text-primary-text-primary'
                  }
                `}>
                  {option.label}
                </div>
              </div>

              {/* Selection indicator - doar o linie subtilă */}
              {isSelected && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full"
                  style={{ backgroundColor: option.borderColor }}
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>


    </motion.div>
  );
};

export default Question; 