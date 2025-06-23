import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { NETWORK_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants.js';

/**
 * Hook pentru gestionarea conexiunii cu portofelul MetaMask
 */
export const useWallet = () => {
  const [walletState, setWalletState] = useState({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isCorrectNetwork: false,
    isLoading: false,
    provider: null,
    signer: null,
  });

  // Verifică dacă MetaMask este instalat
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== 'undefined' && 
           typeof window.ethereum !== 'undefined' && 
           window.ethereum.isMetaMask;
  }, []);

  // Obține provider-ul și signer-ul
  const getProvider = useCallback(() => {
    if (!isMetaMaskInstalled()) return null;
    return new ethers.BrowserProvider(window.ethereum);
  }, [isMetaMaskInstalled]);

  // Verifică dacă rețeaua este corectă (Base Sepolia)
  const isCorrectNetwork = useCallback((chainId) => {
    return parseInt(chainId, 16) === NETWORK_CONFIG.chainId;
  }, []);

  // Conectează portofelul
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      toast.error('MetaMask nu este instalat. Te rugăm să instalezi extensia MetaMask.');
      window.open('https://metamask.io/download/', '_blank');
      return false;
    }

    try {
      setWalletState(prev => ({ ...prev, isLoading: true }));

      const provider = getProvider();
      if (!provider) throw new Error('Nu s-a putut conecta la MetaMask');

      // Cerere de conectare
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('Nu s-au găsit conturi în MetaMask');
      }

      const signer = await provider.getSigner();
      const address = accounts[0];
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(address);

      const newState = {
        isConnected: true,
        address,
        balance: ethers.formatEther(balance),
        chainId: network.chainId,
        isCorrectNetwork: isCorrectNetwork(network.chainId),
        provider,
        signer,
        isLoading: false,
      };

      setWalletState(newState);

      // Salvează adresa în localStorage
      localStorage.setItem('crypto_compass_wallet_address', address);

      toast.success(SUCCESS_MESSAGES.walletConnected);

      // Dacă nu suntem pe rețeaua corectă, încearcă să comutezi
      if (!isCorrectNetwork(network.chainId)) {
        await switchToBaseNetwork();
      }

      return true;
    } catch (error) {
      console.error('Eroare la conectarea portofelului:', error);
      
      let errorMessage = ERROR_MESSAGES.walletNotConnected;
      
      if (error.code === 4001) {
        errorMessage = ERROR_MESSAGES.userRejected;
      } else if (error.code === -32002) {
        errorMessage = 'O cerere de conectare este deja în așteptare în MetaMask';
      }
      
      toast.error(errorMessage);
      setWalletState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, [isMetaMaskInstalled, getProvider, isCorrectNetwork]);

  // Deconectează portofelul
  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isCorrectNetwork: false,
      isLoading: false,
      provider: null,
      signer: null,
    });

    // Șterge din localStorage
    localStorage.removeItem('crypto_compass_wallet_address');

    toast.success('Portofelul a fost deconectat');
  }, []);

  // Comută la rețeaua Base Sepolia
  const switchToBaseNetwork = useCallback(async () => {
    if (!isMetaMaskInstalled()) return false;

    try {
      // Încearcă să comute la Base Sepolia
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}` }],
      });

      toast.success(SUCCESS_MESSAGES.networkSwitched);
      return true;
    } catch (error) {
      // Dacă rețeaua nu există, încearcă să o adaugi
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}`,
              chainName: NETWORK_CONFIG.chainName,
              rpcUrls: [NETWORK_CONFIG.rpcUrl],
              blockExplorerUrls: [NETWORK_CONFIG.blockExplorerUrl],
              nativeCurrency: NETWORK_CONFIG.nativeCurrency,
            }],
          });

          toast.success('Rețeaua Base Sepolia a fost adăugată și selectată');
          return true;
        } catch (addError) {
          console.error('Eroare la adăugarea rețelei:', addError);
          toast.error('Nu s-a putut adăuga rețeaua Base Sepolia');
          return false;
        }
      } else {
        console.error('Eroare la comutarea rețelei:', error);
        toast.error(ERROR_MESSAGES.wrongNetwork);
        return false;
      }
    }
  }, [isMetaMaskInstalled]);

  // Actualizează balanța
  const updateBalance = useCallback(async () => {
    if (!walletState.provider || !walletState.address) return;

    try {
      const balance = await walletState.provider.getBalance(walletState.address);
      setWalletState(prev => ({
        ...prev,
        balance: ethers.formatEther(balance),
      }));
    } catch (error) {
      console.error('Eroare la actualizarea balanței:', error);
    }
  }, [walletState.provider, walletState.address]);

  // Verifică conexiunea la încărcarea inițială
  const checkConnection = useCallback(async () => {
    if (!isMetaMaskInstalled()) return;

    try {
      const provider = getProvider();
      if (!provider) return;

      const accounts = await provider.listAccounts();
      
      if (accounts && accounts.length > 0) {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(address);

        setWalletState({
          isConnected: true,
          address,
          balance: ethers.formatEther(balance),
          chainId: network.chainId,
          isCorrectNetwork: isCorrectNetwork(network.chainId),
          provider,
          signer,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Eroare la verificarea conexiunii:', error);
    }
  }, [isMetaMaskInstalled, getProvider, isCorrectNetwork]);

  // Event listeners pentru MetaMask
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== walletState.address) {
        // Reconectează cu noul cont
        connectWallet();
      }
    };

    const handleChainChanged = (chainId) => {
      // Reload pagina pentru a evita probleme de sincronizare
      window.location.reload();
    };

    const handleConnect = (connectInfo) => {
      console.log('MetaMask conectat:', connectInfo);
    };

    const handleDisconnect = (error) => {
      console.log('MetaMask deconectat:', error);
      disconnectWallet();
    };

    // Adaugă event listeners
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('connect', handleConnect);
    window.ethereum.on('disconnect', handleDisconnect);

    // Verifică conexiunea la început
    checkConnection();

    // Cleanup
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('connect', handleConnect);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [isMetaMaskInstalled, disconnectWallet, connectWallet, checkConnection]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchToBaseNetwork,
    updateBalance,
    isMetaMaskInstalled: isMetaMaskInstalled(),
  };
}; 