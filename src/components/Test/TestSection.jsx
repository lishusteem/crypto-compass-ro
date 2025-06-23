import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

import { useApp } from '../../contexts/AppContext.jsx';
import { calculateResults } from '../../utils/calculateResults.js';
import { areAllQuestionsAnswered } from '../../utils/questions.js';
import AnimatedButton from '../Shared/AnimatedButton.jsx';
import Question from './Question.jsx';
import ProgressBar from './ProgressBar.jsx';
import GlowCard from '../Shared/GlowCard.jsx';

const TestSection = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestion,
    answers,
    startTest,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    canProceedToNext,
    canCompleteTest,
    setResults,
    resetTest,
    loading,
    error,
    clearError,
    getTestProgress
  } = useApp();

  // Inițializează testul dacă nu avem întrebări
  useEffect(() => {
    if (questions.length === 0) {
      startTest();
    }
  }, [questions, startTest]);

  // Redirect la home dacă nu avem întrebări după încărcare
  useEffect(() => {
    if (!loading.test && questions.length === 0) {
      navigate('/');
    }
  }, [loading.test, questions.length, navigate]);

  // Handler pentru navigarea la următoarea întrebare
  const handleNext = () => {
    if (!canProceedToNext()) return;

    if (currentQuestion < questions.length - 1) {
      nextQuestion();
    } else if (canCompleteTest()) {
      handleCompleteTest();
    }
  };

  // Handler pentru navigarea la întrebarea precedentă
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      previousQuestion();
    }
  };

  // Handler pentru completarea testului
  const handleCompleteTest = () => {
    try {
      const results = calculateResults(answers, questions);
      setResults(results);
      navigate('/results');
    } catch (error) {
      console.error('Eroare la calcularea rezultatelor:', error);
    }
  };

  // Handler pentru restart test
  const handleRestartTest = () => {
    resetTest();
    startTest();
  };

  // Handler pentru răspunsul la întrebare
  const handleAnswer = (questionId, value) => {
    clearError();
  };

  // Calculăm progresul
  const progress = getTestProgress();
  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canGoNext = canProceedToNext();
  const canComplete = canCompleteTest();

  // Loading state
  if (loading.test || loading.app) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-10 border-4 border-primary-accent-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-primary-text-secondary">
            Se încarcă testul...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlowCard className="max-w-md text-center" glowColor="orange">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-text-primary">
              Eroare
            </h2>
            <p className="text-primary-text-secondary">
              {error}
            </p>
            <div className="flex gap-4 justify-center">
              <AnimatedButton
                variant="outline"
                onClick={() => navigate('/')}
              >
                Înapoi Acasă
              </AnimatedButton>
              <AnimatedButton
                onClick={handleRestartTest}
                icon={RotateCcw}
              >
                Încearcă Din Nou
              </AnimatedButton>
            </div>
          </div>
        </GlowCard>
      </div>
    );
  }

  // No questions state
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlowCard className="max-w-md text-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-text-primary">
              Nu s-au putut încărca întrebările
            </h2>
            <p className="text-primary-text-secondary">
              Te rugăm să încerci din nou sau să reîncarci pagina.
            </p>
            <AnimatedButton
              onClick={handleRestartTest}
              icon={RotateCcw}
            >
              Încearcă Din Nou
            </AnimatedButton>
          </div>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg flex flex-col">
      {/* Header compact cu progres */}
      <div className="sticky top-0 z-40 bg-primary-bg/90 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold text-primary-text-primary">
              Busola Politică Crypto
            </h1>
            <div className="text-xs text-primary-text-secondary">
              Întrebarea {currentQuestion + 1} din {questions.length}
            </div>
          </div>
          
          <ProgressBar 
            current={currentQuestion + 1}
            total={questions.length}
            progress={progress}
            questions={questions}
            answers={answers}
          />
        </div>
      </div>

      {/* Main content - Folosește flex-1 pentru a ocupa spațiul disponibil */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-6 lg:py-12 xl:py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Question Container cu spacing îmbunătățit */}
            <AnimatePresence mode="wait">
              {currentQ && (
                <motion.div
                  key={currentQ.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 lg:mb-12 xl:mb-16"
                >
                  <Question
                    question={currentQ}
                    answer={answers[currentQ.id]}
                    onAnswer={handleAnswer}
                    questionNumber={currentQuestion + 1}
                    totalQuestions={questions.length}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation cu spacing îmbunătățit */}
            <motion.div 
              className="flex items-center justify-between mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Previous Button */}
              <AnimatedButton
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                icon={ChevronLeft}
                iconPosition="left"
              >
                Înapoi
              </AnimatedButton>

              {/* Central space pentru breathing room */}
              <div className="flex-1" />

              {/* Next/Complete Button */}
              {isLastQuestion && canComplete ? (
                <AnimatedButton
                  onClick={handleCompleteTest}
                  icon={ChevronRight}
                  iconPosition="right"
                  size="lg"
                >
                  Vezi Rezultatele
                </AnimatedButton>
              ) : (
                <AnimatedButton
                  onClick={handleNext}
                  disabled={!canGoNext}
                  icon={ChevronRight}
                  iconPosition="right"
                  variant={canGoNext ? 'primary' : 'secondary'}
                >
                  Următoarea
                </AnimatedButton>
              )}
            </motion.div>

            {/* Help text cu spacing responsive */}
            <motion.div 
              className="text-center mb-6 lg:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-xs lg:text-sm text-primary-text-secondary">
                {!canGoNext 
                  ? "Selectează un răspuns pentru a continua" 
                  : isLastQuestion && canComplete
                  ? "Toate întrebările au fost completate!"
                  : "Răspunsul tău a fost salvat automat"
                }
              </p>
            </motion.div>

            {/* Restart button - foarte discret */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={handleRestartTest}
                icon={RotateCcw}
                className="opacity-60 hover:opacity-100"
              >
                Restart Test
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSection; 