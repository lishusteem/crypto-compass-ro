/**
 * NFT Service for Crypto Compass
 * Handles interaction with the NFT contract for minting compass results as NFTs
 */

import { ethers, BrowserProvider, Contract, formatEther, formatUnits, parseUnits, toBigInt } from 'ethers';
import { generateNFTMetadata, generateNFTSVG } from '../utils/nftSvgGenerator.js';

// Contract details
export const NFT_CONTRACT_ADDRESS = '0x703e445d7e629aA3Df6201F4B952DC758787a55D';
export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const BASE_SEPOLIA_RPC_URL = 'https://sepolia.base.org';

// Basic ERC-721 ABI with minting function (we'll need to update this based on the actual contract)
const NFT_CONTRACT_ABI = [
  // Standard ERC-721 functions
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "svgData",
        "type": "string"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

/**
 * Gets the user's connected wallet provider
 * @returns {BrowserProvider} The wallet provider
 * @throws {Error} If no wallet is connected
 */
export const getWalletProvider = () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask nu este instalat sau disponibil');
  }
  
  return new BrowserProvider(window.ethereum);
};

/**
 * Gets the NFT contract instance
 * @param {ethers.Signer} signer - The wallet signer
 * @returns {Contract} The NFT contract instance
 */
export const getNFTContract = (signer) => {
  return new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
};

/**
 * Checks if user is connected to the correct network (Base Sepolia)
 * @returns {Promise<boolean>} True if on correct network
 */
export const isOnCorrectNetwork = async () => {
  try {
    const provider = getWalletProvider();
    const network = await provider.getNetwork();
    return network.chainId === BASE_SEPOLIA_CHAIN_ID;
  } catch (error) {
    console.error('Error checking network:', error);
    return false;
  }
};

/**
 * Switches to Base Sepolia network
 * @returns {Promise<boolean>} True if switch was successful
 */
export const switchToBaseSepolia = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${BASE_SEPOLIA_CHAIN_ID.toString(16)}` }],
    });
    return true;
  } catch (error) {
    // If the chain hasn't been added, add it
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${BASE_SEPOLIA_CHAIN_ID.toString(16)}`,
              chainName: 'Base Sepolia',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: [BASE_SEPOLIA_RPC_URL],
              blockExplorerUrls: ['https://sepolia.basescan.org/'],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error('Error adding Base Sepolia network:', addError);
        return false;
      }
    }
    console.error('Error switching to Base Sepolia:', error);
    return false;
  }
};

/**
 * Estimates the gas cost for minting an NFT
 * @param {Object} results - User's test results
 * @param {Object} archetype - User's archetype data
 * @param {string} userAddress - User's wallet address
 * @returns {Promise<Object>} Gas estimate and cost information
 */
export const estimateMintingCost = async (results, archetype, userAddress) => {
  try {
    console.log('estimateMintingCost - Starting with params:', { results, archetype, userAddress });
    
    const provider = getWalletProvider();
    console.log('estimateMintingCost - Got provider:', provider);
    
    const signer = await provider.getSigner();
    console.log('estimateMintingCost - Got signer:', signer);
    
    const contract = getNFTContract(signer);
    console.log('estimateMintingCost - Got contract:', contract);
    
    // Generate SVG for the NFT
    const svgString = generateNFTSVG(results, archetype);
    console.log('estimateMintingCost - Generated SVG length:', svgString.length);
    
    // Estimate gas for minting
    console.log('estimateMintingCost - Estimating gas for:', { userAddress, svgLength: svgString.length });
    const gasEstimate = await contract.mint.estimateGas(userAddress, svgString);
    console.log('estimateMintingCost - Gas estimate:', gasEstimate.toString());
    
    // Get current gas price
    const gasPrice = await provider.getGasPrice();
    console.log('estimateMintingCost - Gas price:', gasPrice.toString());
    
    // Calculate total cost
    const totalCost = gasEstimate * gasPrice;
    
    return {
      gasEstimate: gasEstimate.toString(),
      gasPrice: formatUnits(gasPrice, 'gwei'),
      totalCostWei: totalCost.toString(),
      totalCostEth: formatEther(totalCost),
      success: true
    };
  } catch (error) {
    console.error('Error estimating minting cost:', error);
    return {
      error: error.message,
      success: false
    };
  }
};

/**
 * Mints an NFT with the user's compass results
 * @param {Object} results - User's test results
 * @param {Object} archetype - User's archetype data
 * @param {string} userAddress - User's wallet address
 * @param {Function} onProgress - Progress callback function
 * @returns {Promise<Object>} Minting result with transaction hash and token ID
 */
export const mintNFT = async (results, archetype, userAddress, onProgress = () => {}) => {
  try {
    onProgress('Verificare rețea...');
    
    // Check if on correct network
    if (!(await isOnCorrectNetwork())) {
      onProgress('Schimbare către Base Sepolia...');
      const switched = await switchToBaseSepolia();
      if (!switched) {
        throw new Error('Nu s-a putut schimba către rețeaua Base Sepolia');
      }
    }
    
    onProgress('Conectare la contract...');
    
    const provider = getWalletProvider();
    const signer = provider.getSigner();
    const contract = getNFTContract(signer);
    
    onProgress('Generare SVG NFT...');
    
    // Generate SVG for the NFT
    const svgString = generateNFTSVG(results, archetype);
    
    onProgress('Estimare cost tranzacție...');
    
    // Estimate gas
    const gasEstimate = await contract.mint.estimateGas(userAddress, svgString);
    const gasLimit = (gasEstimate * 120n) / 100n; // Add 20% buffer
    
    onProgress('Inițiere tranzacție minting...');
    
    // Execute minting transaction
    const tx = await contract.mint(userAddress, svgString, {
      gasLimit
    });
    
    onProgress('Așteptare confirmare tranzacție...');
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    
    onProgress('Căutare Token ID...');
    
    // Extract token ID from logs (assuming Transfer event is emitted)
    let tokenId = null;
    if (receipt.logs && receipt.logs.length > 0) {
      // Look for Transfer event which should have the tokenId
      for (const log of receipt.logs) {
        try {
          // Try to parse as Transfer event
          if (log.topics.length >= 4) {
            tokenId = toBigInt(log.topics[3]).toString();
            break;
          }
        } catch (e) {
          // Continue if parsing fails
        }
      }
    }
    
    onProgress('NFT mintat cu succes!');
    
    return {
      success: true,
      transactionHash: tx.hash,
      tokenId,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      explorerUrl: `https://sepolia.basescan.org/tx/${tx.hash}`,
      openseaUrl: tokenId ? `https://testnets.opensea.io/assets/base-sepolia/${NFT_CONTRACT_ADDRESS}/${tokenId}` : null
    };
    
  } catch (error) {
    console.error('Error minting NFT:', error);
    
    let errorMessage = 'Eroare necunoscută la mintarea NFT-ului';
    
    if (error.code === 4001) {
      errorMessage = 'Tranzacția a fost anulată de utilizator';
    } else if (error.code === -32000) {
      errorMessage = 'Fonduri insuficiente pentru tranzacție';
    } else if (error.message?.includes('execution reverted')) {
      errorMessage = 'Contractul a respins tranzacția. Verificați parametrii.';
    } else if (error.message?.includes('network')) {
      errorMessage = 'Problemă de conectare la rețea. Încercați din nou.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage,
      code: error.code
    };
  }
};

/**
 * Gets the total number of minted NFTs
 * @returns {Promise<number>} Total supply of NFTs
 */
export const getTotalSupply = async () => {
  try {
    const provider = getWalletProvider();
    const contract = getNFTContract(provider);
    const totalSupply = await contract.totalSupply();
    return totalSupply.toNumber();
  } catch (error) {
    console.error('Error getting total supply:', error);
    return 0;
  }
};

/**
 * Gets the metadata for a specific token ID
 * @param {number} tokenId - The token ID to get metadata for
 * @returns {Promise<Object>} Token metadata
 */
export const getTokenMetadata = async (tokenId) => {
  try {
    const provider = getWalletProvider();
    const contract = getNFTContract(provider);
    const tokenURI = await contract.tokenURI(tokenId);
    
    // If it's a data URI, parse it
    if (tokenURI.startsWith('data:application/json;base64,')) {
      const base64Data = tokenURI.replace('data:application/json;base64,', '');
      const jsonString = atob(base64Data);
      return JSON.parse(jsonString);
    }
    
    return { tokenURI };
  } catch (error) {
    console.error('Error getting token metadata:', error);
    return null;
  }
};

/**
 * Utility function to format wallet address
 * @param {string} address - Full wallet address
 * @returns {string} Formatted address (shortened)
 */
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Utility function to format ETH amount
 * @param {string} weiAmount - Amount in wei
 * @returns {string} Formatted ETH amount
 */
export const formatEthAmount = (weiAmount) => {
  try {
    const ethAmount = formatEther(weiAmount);
    return parseFloat(ethAmount).toFixed(6);
  } catch (error) {
    return '0.000000';
  }
}; 