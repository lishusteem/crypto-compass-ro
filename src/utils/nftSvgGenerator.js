/**
 * NFT SVG Generator
 * Generates dynamic SVG for NFT minting based on user's crypto compass results
 */

/**
 * Generates a complete SVG string for NFT minting
 * @param {Object} results - User's test results
 * @param {Object} archetype - User's specific archetype data
 * @returns {string} Complete SVG string ready for Base64 encoding
 */
export const generateNFTSVG = (results, archetype) => {
  if (!results || !archetype) {
    throw new Error('Results and archetype data are required');
  }

  const { scores } = results;
  const centralizationScore = scores?.raw?.centralization || 0;
  const publicGoodScore = scores?.raw?.privatePublic || 0;

  // Calculate position on compass (same logic as CompassVisualization)
  const centerX = 220;
  const centerY = 220;
  const chartSize = 440;
  
  // Convert scores to position
  const xPosition = centerX + (centralizationScore / 100) * (chartSize / 2);
  const yPosition = centerY - (publicGoodScore / 100) * (chartSize / 2);

  // Generate timestamp
  const timestamp = new Date().toLocaleDateString('ro-RO');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <!-- Definitions for gradients and effects -->
  <defs>
    <!-- Background gradient (GlowCard effect) -->
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="50%" style="stop-color:#1e293b"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    
    <!-- Main orientation badge gradient -->
    <linearGradient id="orientationBadge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f97316"/>
      <stop offset="100%" style="stop-color:#9333ea"/>
    </linearGradient>
    
    <!-- Archetype badge gradient -->
    <linearGradient id="archetypeBadge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8b5cf6"/>
      <stop offset="100%" style="stop-color:#06b6d4"/>
    </linearGradient>
    
    <!-- Quadrant colors -->
    <linearGradient id="topLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6" stop-opacity="0.08"/>
      <stop offset="100%" style="stop-color:#3b82f6" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="topRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c3aed" stop-opacity="0.08"/>
      <stop offset="100%" style="stop-color:#7c3aed" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="bottomLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f97316" stop-opacity="0.08"/>
      <stop offset="100%" style="stop-color:#f97316" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="bottomRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e" stop-opacity="0.08"/>
      <stop offset="100%" style="stop-color:#22c55e" stop-opacity="0.08"/>
    </linearGradient>
    
    <!-- Glow effect for position marker -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Card background with border (GlowCard effect) -->
  <rect x="16" y="16" width="568" height="768" rx="12" fill="url(#cardBg)" stroke="#22d3ee" stroke-width="2" stroke-opacity="0.3"/>
  
  <!-- Card content container (p-8 = 32px padding) -->
  <g transform="translate(48, 48)">
    
    <!-- Header with title and badges -->
    <g>
      <!-- Main title -->
      <text x="256" y="40" text-anchor="middle" fill="#22d3ee" font-size="24" font-weight="bold" font-family="Arial, sans-serif">
        Busola Politică Crypto
      </text>
      
      <!-- Main orientation badge -->
      <rect x="156" y="60" width="200" height="36" rx="18" fill="url(#orientationBadge)"/>
      <text x="256" y="82" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="Arial, sans-serif">
        ${results.orientation || 'Orientare Necunoscută'}
      </text>
      
      <!-- NFT Quote (text between badges) -->
      <g transform="translate(256, 120)">
        <!-- Quote border line -->
        <line x1="-160" y1="0" x2="-140" y2="0" stroke="#22d3ee" stroke-width="2" stroke-opacity="0.5"/>
        <text x="0" y="0" text-anchor="middle" fill="#67e8f9" font-size="14" font-style="italic" font-weight="500" font-family="Arial, sans-serif">
          <tspan x="0" y="0">"${archetype?.nftQuote?.split(' ').slice(0, 4).join(' ') || 'Navighez către viitor'}"</tspan>
          <tspan x="0" y="18">"${archetype?.nftQuote?.split(' ').slice(4).join(' ') || 'prin tehnologie'}"</tspan>
        </text>
      </g>
      
      <!-- Archetype badge -->
      <rect x="146" y="160" width="220" height="32" rx="16" fill="url(#archetypeBadge)" stroke="white" stroke-width="1" stroke-opacity="0.2"/>
      <text x="256" y="180" text-anchor="middle" fill="white" font-size="14" font-weight="600" font-family="Arial, sans-serif">
        ${archetype?.name || 'Arhetip Necunoscut'}
      </text>
    </g>
    
    <!-- Compass Visualization (size 440 from React component) -->
    <g transform="translate(36, 220)">
      <!-- Compass container -->
      <rect x="0" y="0" width="440" height="440" fill="rgba(15, 23, 42, 0.4)" stroke="rgba(156, 163, 175, 0.3)" stroke-width="2" rx="8"/>
      
      <!-- Quadrant backgrounds -->
      <rect x="0" y="0" width="220" height="220" fill="url(#topLeft)" stroke="#3b82f6" stroke-width="1" stroke-opacity="0.2"/>
      <rect x="220" y="0" width="220" height="220" fill="url(#topRight)" stroke="#7c3aed" stroke-width="1" stroke-opacity="0.2"/>
      <rect x="0" y="220" width="220" height="220" fill="url(#bottomLeft)" stroke="#f97316" stroke-width="1" stroke-opacity="0.2"/>
      <rect x="220" y="220" width="220" height="220" fill="url(#bottomRight)" stroke="#22c55e" stroke-width="1" stroke-opacity="0.2"/>
      
      <!-- Grid lines -->
      <!-- Vertical lines -->
      <line x1="110" y1="0" x2="110" y2="440" stroke="rgba(156, 163, 175, 0.2)" stroke-width="1"/>
      <line x1="220" y1="0" x2="220" y2="440" stroke="rgba(156, 163, 175, 0.6)" stroke-width="2"/>
      <line x1="330" y1="0" x2="330" y2="440" stroke="rgba(156, 163, 175, 0.2)" stroke-width="1"/>
      <!-- Horizontal lines -->
      <line x1="0" y1="110" x2="440" y2="110" stroke="rgba(156, 163, 175, 0.2)" stroke-width="1"/>
      <line x1="0" y1="220" x2="440" y2="220" stroke="rgba(156, 163, 175, 0.6)" stroke-width="2"/>
      <line x1="0" y1="330" x2="440" y2="330" stroke="rgba(156, 163, 175, 0.2)" stroke-width="1"/>
      
      <!-- Center point -->
      <circle cx="220" cy="220" r="3" fill="rgba(156, 163, 175, 0.6)"/>
      
      <!-- User position -->
      <circle cx="${xPosition}" cy="${yPosition}" r="14" fill="#f97316" filter="url(#glow)"/>
      <circle cx="${xPosition}" cy="${yPosition}" r="8" fill="white"/>
      <circle cx="${xPosition}" cy="${yPosition}" r="3" fill="#f97316"/>
      
      <!-- Axis labels -->
      <text x="220" y="-5" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold" font-family="Arial, sans-serif">Bun Public</text>
      <text x="220" y="460" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold" font-family="Arial, sans-serif">Bun Privat</text>
      
      <!-- Left label (rotated) -->
      <text x="-30" y="225" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold" font-family="Arial, sans-serif" transform="rotate(-90, -30, 225)">Descentralizat</text>
      
      <!-- Right label (rotated) -->
      <text x="470" y="225" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold" font-family="Arial, sans-serif" transform="rotate(90, 470, 225)">Centralizat</text>
      
      <!-- Scale labels -->
      <text x="110" y="455" text-anchor="middle" fill="#9ca3af" font-size="12" font-family="Arial, sans-serif">-50</text>
      <text x="220" y="455" text-anchor="middle" fill="#9ca3af" font-size="12" font-family="Arial, sans-serif">0</text>
      <text x="330" y="455" text-anchor="middle" fill="#9ca3af" font-size="12" font-family="Arial, sans-serif">50</text>
      
      <text x="-15" y="115" text-anchor="middle" fill="#9ca3af" font-size="12" font-family="Arial, sans-serif">50</text>
      <text x="-15" y="225" text-anchor="middle" fill="#9ca3af" font-size="12" font-family="Arial, sans-serif">0</text>
      <text x="-15" y="335" text-anchor="middle" fill="#9ca3af" font-size="12" font-family="Arial, sans-serif">-50</text>
      
      <!-- Quadrant labels -->
      <text x="110" y="100" text-anchor="middle" fill="#3b82f6" font-size="12" font-weight="500" font-family="Arial, sans-serif" opacity="0.6">
        <tspan x="110" y="100">Descentralizat</tspan>
        <tspan x="110" y="114">Bun Public</tspan>
      </text>
      <text x="330" y="100" text-anchor="middle" fill="#7c3aed" font-size="12" font-weight="500" font-family="Arial, sans-serif" opacity="0.6">
        <tspan x="330" y="100">Centralizat</tspan>
        <tspan x="330" y="114">Bun Public</tspan>
      </text>
      <text x="110" y="340" text-anchor="middle" fill="#f97316" font-size="12" font-weight="500" font-family="Arial, sans-serif" opacity="0.6">
        <tspan x="110" y="340">Descentralizat</tspan>
        <tspan x="110" y="354">Bun Privat</tspan>
      </text>
      <text x="330" y="340" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="500" font-family="Arial, sans-serif" opacity="0.6">
        <tspan x="330" y="340">Centralizat</tspan>
        <tspan x="330" y="354">Bun Privat</tspan>
      </text>
    </g>
    
    <!-- Short description -->
    <text x="256" y="700" text-anchor="middle" fill="#d1d5db" font-size="14" font-family="Arial, sans-serif">
      <tspan x="256" y="700">${archetype?.shortDescription?.substring(0, 40) || 'Rezultatul meu unic în ecosistemul crypto'}</tspan>
      <tspan x="256" y="718">${archetype?.shortDescription?.substring(40, 80) || 'generat prin testul Busola Politică Crypto'}</tspan>
    </text>
    
    <!-- Score info -->
    <text x="256" y="750" text-anchor="middle" fill="#6b7280" font-size="11" font-family="Arial, sans-serif">
      Centralizare: ${Math.round(centralizationScore)}% | Orientare Publică: ${Math.round(publicGoodScore)}% | ${timestamp}
    </text>
    
    <!-- NFT Signature (border-t border-gray-700) -->
    <line x1="0" y1="760" x2="512" y2="760" stroke="#374151" stroke-width="1"/>
    <text x="256" y="780" text-anchor="middle" fill="#6b7280" font-size="12" font-family="Arial, sans-serif">
      www.educatiecripto.ro
    </text>
    
  </g>
</svg>`;
};

/**
 * Converts SVG string to Base64 encoded data URI
 * @param {string} svgString - The SVG string to encode
 * @returns {string} Base64 encoded data URI
 */
export const svgToBase64DataUri = (svgString) => {
  if (typeof btoa !== 'undefined') {
    // Browser environment
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
  } else {
    // Node.js environment (for testing)
    return `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
  }
};

/**
 * Generates NFT metadata JSON
 * @param {Object} results - User's test results
 * @param {Object} archetype - User's specific archetype data
 * @param {number} tokenId - Optional token ID for the NFT
 * @returns {Object} NFT metadata object
 */
export const generateNFTMetadata = (results, archetype, tokenId = null) => {
  const svgString = generateNFTSVG(results, archetype);
  const imageDataUri = svgToBase64DataUri(svgString);
  
  return {
    name: `Busola Politică Crypto${tokenId ? ` #${tokenId}` : ''}`,
    description: `Rezultatul meu în testul Busola Politică Crypto: ${archetype?.name || 'Arhetip Necunoscut'}. ${archetype?.shortDescription || 'Un NFT unic care reflectă orientarea mea politică în ecosistemul cryptocurrency.'}`,
    image: imageDataUri,
    external_url: "https://educatiecripto.ro",
    attributes: [
      {
        trait_type: "Orientare Generală",
        value: results.orientation || 'Necunoscută'
      },
      {
        trait_type: "Arhetip Specific", 
        value: archetype?.name || 'Necunoscut'
      },
      {
        trait_type: "Scor Centralizare",
        value: Math.round(results.scores?.raw?.centralization || 0),
        display_type: "number"
      },
      {
        trait_type: "Scor Orientare Publică",
        value: Math.round(results.scores?.raw?.privatePublic || 0),
        display_type: "number"
      },
      {
        trait_type: "Data Completării",
        value: new Date().toISOString().split('T')[0]
      }
    ]
  };
}; 