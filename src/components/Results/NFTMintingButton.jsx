/**
 * NFT Minting Button Component
 * Handles the entire NFT minting flow with user feedback
 */

import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { useWallet } from '../../hooks/useWallet';
import { 
  mintNFT, 
  estimateMintingCost, 
  formatAddress, 
  formatEthAmount 
} from '../../services/nftService';

const NFTMintingButton = ({ results, archetype }) => {
  const { setNotification } = useContext(AppContext);
  const { address, isConnected, connectWallet } = useWallet();
  const [mintingState, setMintingState] = useState({
    isEstimating: false,
    isMinting: false,
    mintingProgress: '',
    costEstimate: null,
    showCostDetails: false,
    mintingResult: null
  });

  /**
   * Estimates the cost of minting before proceeding
   */
  const handleEstimateCost = async () => {
    if (!isConnected) {
      setNotification({
        type: 'warning',
        message: 'Conectează-ți wallet-ul pentru a estima costul mintării'
      });
      return;
    }

    setMintingState(prev => ({ ...prev, isEstimating: true }));

    try {
      const estimate = await estimateMintingCost(results, archetype, address);
      
      if (estimate.success) {
        setMintingState(prev => ({
          ...prev,
          costEstimate: estimate,
          showCostDetails: true,
          isEstimating: false
        }));
      } else {
        throw new Error(estimate.error);
      }
    } catch (error) {
      setMintingState(prev => ({ ...prev, isEstimating: false }));
      setNotification({
        type: 'error',
        message: `Eroare la estimarea costului: ${error.message}`
      });
    }
  };

  /**
   * Handles the actual NFT minting process
   */
  const handleMintNFT = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setMintingState(prev => ({ 
      ...prev, 
      isMinting: true, 
      mintingProgress: 'Inițiere minting...',
      showCostDetails: false
    }));

    try {
      const result = await mintNFT(
        results, 
        archetype, 
        address, 
        (progress) => {
          setMintingState(prev => ({ ...prev, mintingProgress: progress }));
        }
      );

      setMintingState(prev => ({ 
        ...prev, 
        isMinting: false, 
        mintingResult: result 
      }));

      if (result.success) {
        setNotification({
          type: 'success',
          message: 'NFT mintat cu succes! Verifică wallet-ul tău.',
          duration: 10000
        });
      } else {
        setNotification({
          type: 'error',
          message: result.error,
          duration: 8000
        });
      }
    } catch (error) {
      setMintingState(prev => ({ 
        ...prev, 
        isMinting: false 
      }));
      setNotification({
        type: 'error',
        message: `Eroare la mintarea NFT-ului: ${error.message}`
      });
    }
  };

  /**
   * Resets the minting state to start over
   */
  const resetMintingState = () => {
    setMintingState({
      isEstimating: false,
      isMinting: false,
      mintingProgress: '',
      costEstimate: null,
      showCostDetails: false,
      mintingResult: null
    });
  };

  const { 
    isEstimating, 
    isMinting, 
    mintingProgress, 
    costEstimate, 
    showCostDetails, 
    mintingResult 
  } = mintingState;

  // If minting was successful, show success state
  if (mintingResult?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6 text-center"
      >
        <div className="text-green-400 text-xl font-bold mb-2">
          🎉 NFT Mintat cu Succes!
        </div>
        <div className="text-green-300 text-sm mb-4">
          Rezultatul tău a fost transformat într-un NFT unic pe blockchain-ul Base Sepolia
        </div>
        
        <div className="space-y-3">
          {mintingResult.tokenId && (
            <div className="text-xs text-gray-400">
              Token ID: <span className="text-cyan-400 font-mono">#{mintingResult.tokenId}</span>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a
              href={mintingResult.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
            >
              Vezi pe Base Scan
            </a>
            
            {mintingResult.openseaUrl && (
              <a
                href={mintingResult.openseaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Vezi pe OpenSea
              </a>
            )}
          </div>
          
          <button
            onClick={resetMintingState}
            className="text-cyan-400 hover:text-cyan-300 text-sm underline transition-colors"
          >
            Mintează alt NFT
          </button>
        </div>
      </motion.div>
    );
  }

  // If currently minting, show progress
  if (isMinting) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-lg p-6 text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400"></div>
          <div className="text-orange-400 font-semibold">Mintare în progres...</div>
        </div>
        
        <div className="text-orange-300 text-sm mb-2">
          {mintingProgress}
        </div>
        
        <div className="text-xs text-gray-400">
          Nu închide această pagină până la finalizarea procesului
        </div>
      </motion.div>
    );
  }

  // Show cost estimate details
  if (showCostDetails && costEstimate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6"
      >
        <div className="text-center mb-4">
          <div className="text-blue-400 font-semibold text-lg mb-2">
            Cost Estimat pentru Minting
          </div>
          <div className="text-blue-300 text-sm">
            Costul final poate varia ușor în funcție de congestionarea rețelei
          </div>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Gas Estimat:</span>
            <span className="text-white font-mono">{parseInt(costEstimate.gasEstimate).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Preț Gas:</span>
            <span className="text-white font-mono">{parseFloat(costEstimate.gasPrice).toFixed(2)} Gwei</span>
          </div>
          
          <div className="border-t border-gray-600 pt-2">
            <div className="flex justify-between text-base font-semibold">
              <span className="text-gray-300">Cost Total:</span>
              <span className="text-cyan-400 font-mono">
                {formatEthAmount(costEstimate.totalCostWei)} ETH
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={resetMintingState}
            className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
          >
            Anulează
          </button>
          
          <button
            onClick={handleMintNFT}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all transform hover:scale-[1.02]"
          >
            Confirmă Minting
          </button>
        </div>
      </motion.div>
    );
  }

  // Default state - show mint button
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-500/10 to-purple-600/10 border border-orange-500/20 rounded-lg p-6 text-center"
    >
      <div className="mb-4">
        <div className="text-white font-semibold text-lg mb-2">
          💎 Mintează-ți Rezultatul ca NFT
        </div>
        <div className="text-gray-300 text-sm">
          Transformă rezultatul tău în crypto compass într-un NFT unic pe blockchain-ul Base Sepolia
        </div>
      </div>

      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white font-medium transition-all transform hover:scale-[1.02]"
        >
          Conectează Wallet pentru Minting
        </button>
      ) : (
        <div className="space-y-3">
          <div className="text-xs text-gray-400 mb-3">
            Conectat: {formatAddress(address)}
          </div>
          
          <button
            onClick={handleEstimateCost}
            disabled={isEstimating}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all transform hover:scale-[1.02] disabled:transform-none"
          >
            {isEstimating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Estimare cost...</span>
              </div>
            ) : (
              'Estimează Cost & Mintează'
            )}
          </button>
          
          <div className="text-xs text-gray-500">
            Necesită ETH pentru taxele de gas pe Base Sepolia
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NFTMintingButton; 