import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Shield, Globe, Coins, Users, Crown, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedButton from '../Shared/AnimatedButton.jsx';
import { useApp } from '../../contexts/AppContext.jsx';

const IntroSection = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const { startTest, loading } = useApp();
  const intervalRef = useRef(null);

  const handleStartTest = async () => {
    try {
      // Inițializează testul în context înainte de navigare
      await startTest();
      // Navighează către test doar după ce întrebările sunt încărcate
      navigate('/test');
    } catch (error) {
      console.error('Eroare la inițializarea testului:', error);
      // Poți adăuga aici o notificare de eroare pentru utilizator
    }
  };

  // Cele 16 arhetipuri politice crypto
  const archetypes = [
    {
      id: 'puternic-centralizat-puternic-privat',
      name: 'Capitalistul Reglementat',
      icon: Crown,
      color: 'from-red-600 to-orange-500',
      description: 'Profitul prin control instituțional',
      philosophy: 'Crypto-ul trebuie reglementat pentru a proteja investitorii și a asigura stabilitatea financiară.'
    },
    {
      id: 'puternic-centralizat-moderat-privat',
      name: 'Pragmaticul Instituțional',
      icon: Shield,
      color: 'from-red-500 to-yellow-500',
      description: 'Echilibru între profit și responsabilitate',
      philosophy: 'Avem nevoie de reglementare inteligentă care să permită inovația dar să prevină abuzurile.'
    },
    {
      id: 'puternic-centralizat-moderat-public',
      name: 'Reformatorul Progresist',
      icon: Users,
      color: 'from-blue-600 to-purple-500',
      description: 'Tehnologia pentru binele comun',
      philosophy: 'Guvernele trebuie să folosească crypto pentru a crea servicii publice mai eficiente.'
    },
    {
      id: 'puternic-centralizat-puternic-public',
      name: 'Socialistul Digital',
      icon: Globe,
      color: 'from-blue-700 to-green-600',
      description: 'Redistribuire prin tehnologie',
      philosophy: 'Crypto-ul poate fi instrumentul pentru o societate mai echitabilă, dar numai prin control public.'
    },
    {
      id: 'moderat-centralizat-puternic-privat',
      name: 'Antreprenorul Adaptat',
      icon: Coins,
      color: 'from-orange-500 to-red-400',
      description: 'Inovație cu cadru legal',
      philosophy: 'Piața liberă cu reguli clare - asta e calea către prosperitate în crypto.'
    },
    {
      id: 'moderat-centralizat-moderat-privat',
      name: 'Moderatul Pragmatic',
      icon: Brain,
      color: 'from-gray-500 to-blue-500',
      description: 'Echilibru în toate aspectele',
      philosophy: 'Cea mai bună abordare e să combinăm libertatea cu responsabilitatea.'
    },
    {
      id: 'moderat-centralizat-moderat-public',
      name: 'Democratul Tehnologic',
      icon: Users,
      color: 'from-blue-500 to-green-500',
      description: 'Participare și transparență',
      philosophy: 'Crypto trebuie să servească democrația și să facă guvernarea mai transparentă.'
    },
    {
      id: 'moderat-centralizat-puternic-public',
      name: 'Activistul Instituțional',
      icon: Globe,
      color: 'from-green-600 to-blue-600',
      description: 'Schimbare prin canale oficiale',
      philosophy: 'Putem folosi instituțiile existente pentru a face crypto să servească societății.'
    },
    {
      id: 'moderat-descentralizat-puternic-privat',
      name: 'Libertarianul Moderat',
      icon: Rocket,
      color: 'from-purple-500 to-orange-500',
      description: 'Libertate cu limite',
      philosophy: 'Vrem libertate maximă, dar înțelegem că anumite reguli sunt necesare.'
    },
    {
      id: 'moderat-descentralizat-moderat-privat',
      name: 'Individualistul Echilibrat',
      icon: Brain,
      color: 'from-purple-400 to-blue-400',
      description: 'Autonomie personală responsabilă',
      philosophy: 'Fiecare să-și aleagă drumul, dar să respecte și drepturile altora.'
    },
    {
      id: 'moderat-descentralizat-moderat-public',
      name: 'Cooperativistul Digital',
      icon: Users,
      color: 'from-green-500 to-purple-500',
      description: 'Colaborare voluntară',
      philosophy: 'Comunitățile pot să se auto-organizeze pentru binele comun fără forță.'
    },
    {
      id: 'moderat-descentralizat-puternic-public',
      name: 'Anarhist-Socialistul',
      icon: Globe,
      color: 'from-green-600 to-purple-600',
      description: 'Solidaritate fără stat',
      philosophy: 'Putem crea o societate echitabilă prin cooperare voluntară, nu prin forță.'
    },
    {
      id: 'puternic-descentralizat-puternic-privat',
      name: 'Crypto-Anarhist',
      icon: Zap,
      color: 'from-yellow-500 to-red-500',
      description: 'Libertate absolută',
      philosophy: 'Codul este lege. Guvernele sunt obsolete. Fiecare pentru sine.'
    },
    {
      id: 'puternic-descentralizat-moderat-privat',
      name: 'Pionierul Pragmatic',
      icon: Rocket,
      color: 'from-yellow-400 to-purple-500',
      description: 'Inovație fără limite',
      philosophy: 'Să construim viitorul fără să întrebăm permisiunea, dar să fim și responsabili.'
    },
    {
      id: 'puternic-descentralizat-moderat-public',
      name: 'Vizionarul Comunitar',
      icon: Globe,
      color: 'from-purple-500 to-green-500',
      description: 'Tehnologie pentru toți',
      philosophy: 'Descentralizarea poate crea abundență pentru toată lumea, nu doar pentru elită.'
    },
    {
      id: 'puternic-descentralizat-puternic-public',
      name: 'Utopistul Crypto',
      icon: Zap,
      color: 'from-green-500 to-blue-500',
      description: 'Revoluție pentru umanitate',
      philosophy: 'Crypto va libera omenirea de toate formele de opresiune și va crea o lume perfectă.'
    }
  ];

  // Funcție pentru începerea/reînceperea timer-ului automat
  const startAutoTimer = useCallback(() => {
    // Oprește timer-ul existent dacă există
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Începe un nou timer
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % Math.ceil(archetypes.length / 4));
    }, 7000);
  }, [archetypes.length]);

  // Auto-cycle carousel every 7 seconds
  useEffect(() => {
    startAutoTimer();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoTimer]);

  const totalPages = Math.ceil(archetypes.length / 4);
  const currentArchetypes = archetypes.slice(currentPage * 4, (currentPage + 1) * 4);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    // Resetează timer-ul automat după navigarea manuală
    startAutoTimer();
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    // Resetează timer-ul automat după navigarea manuală
    startAutoTimer();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8">
      <div className="container mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-gradient">
            Busola Politică Crypto
          </h1>
          <p className="text-lg text-primary-text-secondary max-w-3xl mx-auto">
            <strong>Descoperă-ți ADN-ul politic în ecosistemul crypto.</strong> Fiecare alegere în Web3 reflectă o viziune despre putere, libertate și societate. 
            Care dintre aceste 16 arhetipuri politice te reprezintă?
          </p>
        </motion.div>

        {/* Philosophical Questions */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto text-sm">
            <div className="p-3 bg-slate-800/30 rounded-lg border border-cyan-400/20">
              <span className="text-cyan-400">💭</span> <strong>Cine ar trebui să controleze banii?</strong> Guvernele sau algoritmii?
            </div>
            <div className="p-3 bg-slate-800/30 rounded-lg border border-purple-400/20">
              <span className="text-purple-400">💭</span> <strong>Este libertatea mai importantă</strong> decât stabilitatea socială?
            </div>
          </div>
        </motion.div>

        {/* Archetypes Carousel */}
        <motion.div 
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-10">
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-cyan-400/30 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-10">
            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-cyan-400/30 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Archetypes Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {currentArchetypes.map((archetype, index) => {
                const Icon = archetype.icon;
                return (
                  <motion.div
                    key={archetype.id}
                    className={`relative cursor-pointer p-4 rounded-xl bg-gradient-to-br ${archetype.color} opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <div className="text-center space-y-3">
                      <Icon className="w-8 h-8 mx-auto text-white" />
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {archetype.name}
                      </h3>
                      <p className="text-xs text-white/80 leading-tight">
                        {archetype.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <AnimatedButton
            size="lg"
            onClick={handleStartTest}
            disabled={loading.test}
            className="bg-gradient-to-r from-primary-accent-orange to-primary-accent-purple"
          >
            {loading.test ? 'Se încarcă...' : 'Începe Testul'}
          </AnimatedButton>
          
          <p className="text-sm text-primary-text-secondary">
            30 de întrebări • 8-12 minute • Poți minta rezultatul ca NFT
          </p>
        </motion.div>

        {/* Political Stakes */}
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-sm text-gray-400 italic">
            "Crypto nu e doar tehnologie - e o declarație politică despre cum ar trebui să arate viitorul societății. 
            Testul tău va revela nu doar preferințele tale tehnice, ci și viziunea ta despre putere, libertate și justiție în era digitală."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroSection; 