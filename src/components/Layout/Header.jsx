import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Wallet, ChevronDown, ExternalLink, Copy, LogOut } from 'lucide-react';

import { useWallet } from '../../hooks/useWallet.js';
import { NETWORK_CONFIG } from '../../utils/constants.js';
import AnimatedButton from '../Shared/AnimatedButton.jsx';

const Header = () => {
  const location = useLocation();
  const { 
    account, 
    balance, 
    isConnected, 
    isConnecting, 
    networkError, 
    connectWallet, 
    disconnectWallet,
    switchNetwork 
  } = useWallet();
  
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Handler pentru copierea adresei
  const handleCopyAddress = async () => {
    if (account) {
      try {
        await navigator.clipboard.writeText(account);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } catch (error) {
        console.error('Eroare la copierea adresei:', error);
      }
    }
  };

  // Handler pentru disconnect
  const handleDisconnect = () => {
    disconnectWallet();
    setShowAccountMenu(false);
  };

  // Formatează adresa wallet-ului
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Formatează balanta
  const formatBalance = (balance) => {
    if (!balance) return '0.00';
    return parseFloat(balance).toFixed(4);
  };

  // Verifică dacă suntem pe pagina de test
  const isTestPage = location.pathname === '/test';
  const isResultsPage = location.pathname === '/results';

  return (
    <header className="sticky top-0 z-50 bg-primary-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo și navigare */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <motion.div
                className="p-2 rounded-xl bg-gradient-to-br from-primary-accent-orange to-primary-accent-blue"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Compass className="w-6 h-6 text-white" />
              </motion.div>
              
              <div>
                <h1 className="text-xl font-bold text-primary-text-primary group-hover:text-primary-accent-orange transition-colors">
                  Busola Politică
                </h1>
                <p className="text-xs text-primary-text-secondary">
                  Crypto Compass
                </p>
              </div>
            </Link>

            {/* Navigation Links */}
            {!isTestPage && !isResultsPage && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors hover:text-primary-accent-orange ${
                    location.pathname === '/' 
                      ? 'text-primary-accent-orange' 
                      : 'text-primary-text-secondary'
                  }`}
                >
                  Acasă
                </Link>
                
                <Link 
                  to="/test" 
                  className="text-sm font-medium text-primary-text-secondary hover:text-primary-accent-orange transition-colors"
                >
                  Începe Testul
                </Link>
              </nav>
            )}
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            
            {/* Network Error Warning */}
            {networkError && (
              <motion.div
                className="hidden md:flex items-center px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="mr-2">⚠️</span>
                Rețea incorectă
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={switchNetwork}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  Switch to Base Sepolia
                </AnimatedButton>
              </motion.div>
            )}

            {/* Wallet Connection */}
            {!isConnected ? (
              <AnimatedButton
                onClick={connectWallet}
                disabled={isConnecting}
                icon={Wallet}
                variant="primary"
                size="md"
              >
                {isConnecting ? 'Se conectează...' : 'Conectează Wallet'}
              </AnimatedButton>
            ) : (
              <div className="relative">
                <AnimatedButton
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  variant="secondary"
                  size="md"
                  icon={ChevronDown}
                  iconPosition="right"
                  className="min-w-[160px]"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    {formatAddress(account)}
                  </div>
                </AnimatedButton>

                {/* Account Dropdown Menu */}
                {showAccountMenu && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-80 bg-primary-secondary border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Account Info Header */}
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                          <span className="text-sm font-medium text-primary-text-primary">
                            Conectat
                          </span>
                        </div>
                        <div className="text-xs text-primary-text-secondary">
                          {NETWORK_CONFIG.name}
                        </div>
                      </div>
                      
                      {/* Address */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-primary-text-secondary">Adresa</span>
                          <button
                            onClick={handleCopyAddress}
                            className="text-xs text-primary-accent-orange hover:text-primary-accent-orange/80 transition-colors flex items-center"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {copiedAddress ? 'Copiată!' : 'Copiază'}
                          </button>
                        </div>
                        <div className="font-mono text-sm text-primary-text-primary bg-primary-bg px-3 py-2 rounded-lg">
                          {account}
                        </div>
                      </div>

                      {/* Balance */}
                      <div className="mt-3 space-y-1">
                        <span className="text-xs text-primary-text-secondary">Balanta</span>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary-text-primary">
                            {formatBalance(balance)} ETH
                          </span>
                          <span className="text-xs text-primary-text-secondary">
                            Base Sepolia
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-4 space-y-2">
                      <button
                        onClick={() => window.open(`${NETWORK_CONFIG.blockExplorer}/address/${account}`, '_blank')}
                        className="w-full flex items-center justify-between p-3 text-sm text-primary-text-primary hover:bg-primary-bg rounded-lg transition-colors"
                      >
                        <span>Vezi pe Block Explorer</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      
                      {balance && parseFloat(balance) < 0.01 && (
                        <button
                          onClick={() => window.open('https://www.alchemy.com/faucets/base-sepolia', '_blank')}
                          className="w-full flex items-center justify-between p-3 text-sm text-primary-accent-blue hover:bg-primary-bg rounded-lg transition-colors"
                        >
                          <span>Obține ETH Testnet</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="border-t border-white/10 pt-2">
                        <button
                          onClick={handleDisconnect}
                          className="w-full flex items-center justify-between p-3 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <span>Deconectează Wallet</span>
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showAccountMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowAccountMenu(false)}
        />
      )}
    </header>
  );
};

export default Header; 