import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Share2, Download, RotateCcw, Trophy, Target, Eye, Zap } from 'lucide-react';
import html2canvas from 'html2canvas';

import { useApp } from '../../contexts/AppContext.jsx';
import { useWallet } from '../../hooks/useWallet.js';
import CompassVisualization from './CompassVisualization.jsx';
import AnimatedButton from '../Shared/AnimatedButton.jsx';
import GlowCard from '../Shared/GlowCard.jsx';
import { getArchetypeFromScores } from '../../utils/constants.js';

const ResultsSection = () => {
  const navigate = useNavigate();
  const { results, resetTest } = useApp();
  const { account, isConnected, connectWallet } = useWallet();
  const [isSharing, setIsSharing] = useState(false);
  const [showNFTMint, setShowNFTMint] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const nftContainerRef = useRef(null);

  // Redirect dacă nu avem rezultate
  useEffect(() => {
    if (!results) {
      navigate('/');
    }
  }, [results, navigate]);

  // Handler pentru restart test
  const handleRestartTest = () => {
    resetTest();
    navigate('/');
  };

  // Handler pentru share pe social media
  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      const shareData = {
        title: 'Busola Mea Politică Crypto',
        text: `Am completat testul Busola Politică Crypto și sunt ${archetype?.name || results.orientation}! Descoperă-ți și tu arhetipul tău în ecosistemul crypto.`,
        url: window.location.origin
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback pentru desktop
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(twitterUrl, '_blank');
      }
    } catch (error) {
      console.error('Eroare la share:', error);
    } finally {
      setIsSharing(false);
    }
  };

  // Handler pentru download ca imagine PNG
  const handleDownload = async () => {
    if (!nftContainerRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Configurația pentru html2canvas
      const canvas = await html2canvas(nftContainerRef.current, {
        backgroundColor: 'transparent',
        scale: 2, // Pentru calitate HD
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: nftContainerRef.current.offsetWidth,
        height: nftContainerRef.current.offsetHeight,
        windowWidth: nftContainerRef.current.offsetWidth,
        windowHeight: nftContainerRef.current.offsetHeight,
      });

      // Convertim canvas-ul în blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Creăm link-ul de download
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `crypto-compass-${archetype?.name?.replace(/\s+/g, '-').toLowerCase() || 'rezultat'}-${Date.now()}.png`;
          
          // Trigger download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Cleanup
          URL.revokeObjectURL(url);
        }
      }, 'image/png', 1.0);
      
    } catch (error) {
      console.error('Eroare la generarea imaginii:', error);
      alert('A apărut o eroare la generarea imaginii. Te rog încearcă din nou.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Handler pentru mint NFT
  const handleMintNFT = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    setShowNFTMint(true);
  };

  // Determinăm arhetipul exact pe baza scorurilor
  const archetype = results ? getArchetypeFromScores(
    results.scores?.raw?.centralization || 0,
    results.scores?.raw?.privatePublic || 0
  ) : null;

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-primary-accent-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-primary-text-secondary">
            Se încarcă rezultatele...
          </p>
        </div>
      </div>
    );
  }





  return (
    <div className="min-h-screen bg-primary-bg py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header cu celebrare */}
          <motion.div 
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-accent-orange/20 to-primary-accent-blue/20 text-primary-accent-orange border border-primary-accent-orange/30">
              <Trophy className="w-5 h-5 mr-2" />
              Test Completat!
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-primary-text-primary">
              Busola Mea Politică Crypto
            </h1>
            

          </motion.div>

          {/* Main Results Layout */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            
            {/* Left Side - NFT Preview Container */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* NFT Container - This represents what will be minted */}
              <div ref={nftContainerRef}>
                <GlowCard className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-400/30" glowColor="orange">
                  <div className="space-y-6">
                  {/* Header with orientation and archetype */}
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-cyan-400">
                      Busola Politică Crypto
                    </h2>
                    
                    {/* Orientarea generică - badge principal */}
                    <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white text-base font-bold shadow-lg">
                      {results.orientation || 'Orientare Necunoscută'}
                    </div>

                    {/* Text NFT - Citat între badge-uri */}
                    {archetype?.nftQuote && (
                      <div className="text-center px-4">
                        <p className="text-sm text-cyan-300 italic font-medium leading-relaxed border-l-2 border-cyan-400/50 pl-4 mx-auto max-w-xs">
                          "{archetype.nftQuote}"
                        </p>
                      </div>
                    )}

                    {/* Arhetipul specific - badge secundar */}
                    <div className={`inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r ${archetype?.color || 'from-gray-500 to-gray-600'} text-white text-sm font-semibold shadow-md border border-white/20`}>
                      {archetype?.name || 'Arhetip Necunoscut'}
                    </div>
                  </div>

                  {/* Compass Visualization */}
                  <div className="flex justify-center -my-3">
                    <CompassVisualization 
                      results={results}
                      size={440}
                      interactive={true}
                      showLabels={true}
                    />
                  </div>

                  {/* Descriere scurtă în partea de jos a NFT-ului */}
                  <div className="text-center">
                    <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
                      {archetype?.shortDescription || results.description || 'Descriere indisponibilă'}
                    </p>
                  </div>

                  {/* NFT Signature */}
                  <div className="text-center pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-500">
                      www.educatiecripto.ro
                    </p>
                  </div>
                  </div>
                </GlowCard>
              </div>
            </motion.div>

            {/* Right Side - Detailed Explanation */}
            <motion.div 
              className="space-y-6 h-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Detailed Analysis */}
              <GlowCard className="p-8 h-full flex flex-col" glowColor="blue">
                <div className="space-y-6 flex-1">
                  <h2 className="text-2xl font-bold text-primary-text-primary flex items-center">
                    <Target className="w-6 h-6 mr-2" />
                    Analiza Detaliată
                  </h2>
                  
                  {/* Scoruri Precise */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-400/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">
                          {Math.round(results.scores?.raw?.centralization || 0)}
                        </div>
                        <div className="text-xs text-cyan-300 mt-1">
                          Centralizare
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.abs(results.scores?.raw?.centralization || 0)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-400/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {Math.round(results.scores?.raw?.privatePublic || 0)}
                        </div>
                        <div className="text-xs text-purple-300 mt-1">
                          Bun Public
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div 
                            className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.abs(results.scores?.raw?.privatePublic || 0)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Viziunea */}
                  {archetype?.vision && (
                    <div className="p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-400/20">
                      <div className="text-center mb-4">
                        <Eye className="w-16 h-16 mx-auto text-blue-400 mb-3" />
                        <h4 className="text-xl font-semibold text-blue-400">
                          Viziunea Mea
                        </h4>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed text-center">
                        {archetype.vision}
                      </p>
                    </div>
                  )}

                  {/* Misiunea */}
                  {archetype?.mission && (
                    <div className="p-6 bg-gradient-to-br from-purple-900/30 to-orange-900/30 rounded-lg border border-purple-400/20">
                      <div className="text-center mb-4">
                        <Zap className="w-16 h-16 mx-auto text-purple-400 mb-3" />
                        <h4 className="text-xl font-semibold text-purple-400">
                          Misiunea Mea
                        </h4>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed text-center">
                        {archetype.mission}
                      </p>
                    </div>
                  )}


                </div>
              </GlowCard>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {/* Share Button */}
            <AnimatedButton
              onClick={handleShare}
              disabled={isSharing}
              icon={Share2}
              variant="secondary"
              size="lg"
            >
              {isSharing ? 'Se distribuie...' : 'Distribuie Rezultatul'}
            </AnimatedButton>

            {/* Download Button */}
            <AnimatedButton
              onClick={handleDownload}
              disabled={isDownloading}
              icon={Download}
              variant="outline"
              size="lg"
            >
              {isDownloading ? 'Se generează imaginea...' : 'Descarcă ca PNG'}
            </AnimatedButton>

            {/* Mint NFT Button */}
            <AnimatedButton
              onClick={handleMintNFT}
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-primary-accent-orange to-primary-accent-purple"
            >
              {isConnected ? 'Mint ca NFT' : 'Conectează Wallet pentru NFT'}
            </AnimatedButton>

            {/* Restart Test Button */}
            <AnimatedButton
              onClick={handleRestartTest}
              icon={RotateCcw}
              variant="ghost"
              size="lg"
            >
              Refă Testul
            </AnimatedButton>
          </motion.div>

          {/* NFT Minting Section */}
          {showNFTMint && isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <GlowCard className="p-8 text-center" glowColor="purple">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary-text-primary">
                    Mint Rezultatul ca NFT
                  </h3>
                  
                  <p className="text-primary-text-secondary max-w-2xl mx-auto">
                    Transformă rezultatul tău în NFT pe rețeaua Base Sepolia. 
                    Vei plăti doar gas-ul pentru tranzacție.
                  </p>
                  
                  <div className="inline-flex items-center px-4 py-2 bg-primary-secondary rounded-lg">
                    <span className="text-sm text-primary-text-secondary">
                      Wallet conectat: {account?.slice(0, 6)}...{account?.slice(-4)}
                    </span>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <AnimatedButton
                      variant="primary"
                      size="lg"
                      className="bg-gradient-to-r from-primary-accent-purple to-primary-accent-blue"
                    >
                      Confirmă Mint NFT
                    </AnimatedButton>
                    
                    <AnimatedButton
                      onClick={() => setShowNFTMint(false)}
                      variant="outline"
                      size="lg"
                    >
                      Anulează
                    </AnimatedButton>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          )}


        </div>
      </div>
    </div>
  );
};

export default ResultsSection; 