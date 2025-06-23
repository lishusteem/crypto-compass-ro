import { getCentralizationLevel, getPrivatePublicLevel, formatScore } from './constants.js';

// Descrierile pentru toate cele 16 orientări posibile
const orientationDescriptions = {
  'Puternic Centralizat-Puternic Bun Privat': 
    "Cred într-o abordare foarte centralizată a criptomonedelor, cu control puternic din partea autorităților. Valorez criptomonedele în principal pentru crearea de avere și inovație tehnologică, subliniind necesitatea reglementării pentru a menține stabilitatea și securitatea.",
  
  'Puternic Centralizat-Moderat Bun Privat': 
    "Susțin o abordare foarte centralizată a criptomonedelor, cu o viziune echilibrată asupra beneficiilor private și publice. Recunosc potențialul pentru profit și avansare tehnologică, dar înțeleg și importanța considerațiilor sociale și de mediu.",
  
  'Puternic Centralizat-Moderat Bun Public': 
    "Favorez o abordare foarte centralizată a criptomonedelor cu accent pe beneficiile publice. Cred că autoritățile centrale ar trebui să asigure utilizarea responsabilă a monedelor digitale pentru a promova obiectivele sociale și de mediu.",
  
  'Puternic Centralizat-Puternic Bun Public': 
    "Pledez pentru o abordare foarte centralizată a criptomonedelor cu un accent puternic pe potențialul lor de a servi binelui public. Susțin implicarea activă a guvernului pentru a asigura că criptomonedele abordează preocupările societății și beneficiază o gamă largă de oameni.",
  
  'Moderat Centralizat-Puternic Bun Privat': 
    "Prefer un nivel moderat de centralizare cu un accent puternic pe profit și avansare tehnologică. Recunosc necesitatea unor reglementări, dar valorez importanța descentralizării pentru inovație și competiție.",
  
  'Moderat Centralizat-Moderat Bun Privat': 
    "Susțin o abordare echilibrată atât pentru centralizare, cât și pentru aspectele private/publice ale criptomonedelor. Recunosc importanța profitului și a impactului social și valorez un mix de abordări centralizate și descentralizate.",
  
  'Moderat Centralizat-Moderat Bun Public': 
    "Favorez centralizarea moderată cu o viziune echilibrată asupra beneficiilor publice și private. Prioritizez impactul social și preocupările de mediu, recunoscând în același timp importanța profitului și a avansării tehnologice.",
  
  'Moderat Centralizat-Puternic Bun Public': 
    "Susțin centralizarea moderată cu accent pe beneficiile publice. Cred că o anumită implicare guvernamentală este necesară pentru a asigura că criptomonedele beneficiază o gamă mai largă de oameni și abordează preocupările societății.",
  
  'Moderat Descentralizat-Puternic Bun Privat': 
    "Favorez moderat descentralizarea cu un accent puternic pe profit și avansare tehnologică. Valorez sistemele fără permisiuni, confidențialitatea și mediile fără încredere, recunoscând în același timp necesitatea unei anumite centralizări.",
  
  'Moderat Descentralizat-Moderat Bun Privat': 
    "Susțin descentralizarea moderată cu o viziune echilibrată asupra beneficiilor private și publice. Recunosc importanța atât a profitului, cât și a impactului social și valorez sistemele fără permisiuni și confidențialitate.",
  
  'Moderat Descentralizat-Moderat Bun Public': 
    "Favorez descentralizarea moderată cu o viziune echilibrată asupra beneficiilor publice și private. Prioritizez impactul social și preocupările de mediu, recunoscând în același timp importanța profitului și a avansării tehnologice.",
  
  'Moderat Descentralizat-Puternic Bun Public': 
    "Susțin descentralizarea moderată cu accent pe beneficiile publice. Cred că sistemele descentralizate pot aborda preocupările societății și pot beneficia o gamă mai largă de oameni.",
  
  'Puternic Descentralizat-Puternic Bun Privat': 
    "Favorez puternic descentralizarea cu accent pe profit și avansare tehnologică. Susțin sistemele fără permisiuni, confidențialitatea și mediile fără încredere și mă pot opune implicării guvernului.",
  
  'Puternic Descentralizat-Moderat Bun Privat': 
    "Susțin puternic descentralizarea cu o viziune echilibrată asupra beneficiilor private și publice. Valorez sistemele fără permisiuni și confidențialitatea, recunoscând în același timp importanța considerațiilor sociale și de mediu.",
  
  'Puternic Descentralizat-Moderat Bun Public': 
    "Favorez puternic descentralizarea cu o viziune echilibrată asupra beneficiilor publice și private. Prioritizez impactul social și preocupările de mediu, recunoscând în același timp importanța profitului într-un mediu descentralizat.",
  
  'Puternic Descentralizat-Puternic Bun Public': 
    "Susțin puternic descentralizarea cu accent pe beneficiile publice. Cred că sistemele fără permisiuni și confidențialitatea sunt esențiale pentru realizarea incluziunii financiare, sustenabilității mediului și împuternicirii sociale."
};

/**
 * Calculează rezultatele finale ale testului pe baza răspunsurilor utilizatorului
 * @param {Object} userAnswers - Obiect cu răspunsurile utilizatorului {questionId: {value, direction}}
 * @param {Array} questions - Array cu întrebările testului 
 * @returns {Object} Rezultatele calculate
 */
export function calculateResults(userAnswers, questions = []) {
  let cdTotal = 0; // Total pentru dimensiunea Centralizare/Descentralizare
  let pgTotal = 0; // Total pentru dimensiunea Privat/Public
  let cdCount = 0; // Numărul de întrebări pentru CD
  let pgCount = 0; // Numărul de întrebări pentru PG
  
  // Procesarea răspunsurilor
  for (const questionId in userAnswers) {
    const answer = userAnswers[questionId];
    const question = questions.find(q => q.id === questionId);
    
    if (!answer || !question || !answer.value) continue;
    
    const value = answer.value; // 1-5
    const normalizedValue = ((value - 3) / 2) * 100; // Convertește la interval -100 to 100
    
    if (questionId.startsWith('c')) {
      // Întrebare pentru dimensiunea Centralizare/Descentralizare
      if (question.direction === 'centralized') {
        // Răspuns pozitiv = mai centralizat (scor negativ)
        cdTotal -= normalizedValue;
      } else {
        // Răspuns pozitiv = mai descentralizat (scor pozitiv) 
        cdTotal += normalizedValue;
      }
      cdCount++;
    } else if (questionId.startsWith('p')) {
      // Întrebare pentru dimensiunea Privat/Public
      if (question.direction === 'public') {
        // Răspuns pozitiv = mai orientat spre bun public (scor pozitiv)
        pgTotal += normalizedValue;
      } else {
        // Răspuns pozitiv = mai orientat spre bun privat (scor negativ)
        pgTotal -= normalizedValue;
      }
      pgCount++;
    }
  }
  
  // Calcularea scorurilor finale (media)
  const cdScore = cdCount > 0 ? cdTotal / cdCount : 0;
  const pgScore = pgCount > 0 ? pgTotal / pgCount : 0;
  
  // Determinarea nivelurilor pentru fiecare dimensiune
  const cLevel = getCentralizationLevel(cdScore);
  const pLevel = getPrivatePublicLevel(pgScore);
  
  // Crearea cheii pentru orientare
  const orientationKey = `${cLevel}-${pLevel}`;
  
  // Rezultatul final
  const result = {
    scores: {
      centralization: formatScore(cdScore),
      privatePublic: formatScore(pgScore),
      raw: {
        centralization: cdScore,
        privatePublic: pgScore
      }
    },
    levels: {
      centralization: cLevel,
      privatePublic: pLevel
    },
    orientation: orientationKey,
    description: orientationDescriptions[orientationKey] || "Orientare necunoscută",
    metadata: {
      questionsAnswered: {
        centralization: cdCount,
        privatePublic: pgCount,
        total: cdCount + pgCount
      },
      timestamp: Date.now(),
      version: "1.0"
    }
  };
  
  return result;
}

/**
 * Validează rezultatele calculate
 * @param {Object} results - Rezultatele de validat
 * @returns {boolean} True dacă rezultatele sunt valide
 */
export function validateResults(results) {
  if (!results || typeof results !== 'object') return false;
  
  const { scores, levels, orientation, description } = results;
  
  // Verifică structura de bază
  if (!scores || !levels || !orientation || !description) return false;
  
  // Verifică scorurile
  if (typeof scores.centralization !== 'number' || 
      typeof scores.privatePublic !== 'number') return false;
      
  if (scores.centralization < -100 || scores.centralization > 100 ||
      scores.privatePublic < -100 || scores.privatePublic > 100) return false;
  
  // Verifică orientarea
  if (!orientationDescriptions[orientation]) return false;
  
  return true;
}

/**
 * Obține statistici despre distribuția rezultatelor
 * @param {Array} allResults - Array cu toate rezultatele
 * @returns {Object} Statistici
 */
export function getResultsStatistics(allResults) {
  if (!allResults || allResults.length === 0) {
    return {
      total: 0,
      averageScores: { centralization: 0, privatePublic: 0 },
      distributions: {},
      mostCommon: null
    };
  }
  
  const orientationCounts = {};
  let totalCD = 0;
  let totalPG = 0;
  
  allResults.forEach(result => {
    if (validateResults(result)) {
      totalCD += result.scores.centralization;
      totalPG += result.scores.privatePublic;
      
      const orientation = result.orientation;
      orientationCounts[orientation] = (orientationCounts[orientation] || 0) + 1;
    }
  });
  
  const validResults = allResults.filter(validateResults);
  const count = validResults.length;
  
  // Găsește orientarea cea mai comună
  const mostCommon = Object.entries(orientationCounts)
    .sort(([,a], [,b]) => b - a)[0];
  
  return {
    total: count,
    averageScores: {
      centralization: count > 0 ? formatScore(totalCD / count) : 0,
      privatePublic: count > 0 ? formatScore(totalPG / count) : 0
    },
    distributions: orientationCounts,
    mostCommon: mostCommon ? {
      orientation: mostCommon[0],
      count: mostCommon[1],
      percentage: Math.round((mostCommon[1] / count) * 100)
    } : null
  };
}

/**
 * Compară două rezultate și returnează similaritatea
 * @param {Object} result1 - Primul rezultat
 * @param {Object} result2 - Al doilea rezultat  
 * @returns {Object} Similaritatea și diferențele
 */
export function compareResults(result1, result2) {
  if (!validateResults(result1) || !validateResults(result2)) {
    return { similarity: 0, differences: {} };
  }
  
  const cdDiff = Math.abs(result1.scores.centralization - result2.scores.centralization);
  const pgDiff = Math.abs(result1.scores.privatePublic - result2.scores.privatePublic);
  
  // Calculează similaritatea (100 - diferența medie)
  const avgDiff = (cdDiff + pgDiff) / 2;
  const similarity = Math.max(0, 100 - avgDiff);
  
  return {
    similarity: formatScore(similarity),
    differences: {
      centralization: formatScore(cdDiff),
      privatePublic: formatScore(pgDiff),
      orientation: result1.orientation === result2.orientation
    },
    analysis: {
      sameQuadrant: getSameQuadrant(result1, result2),
      closeness: similarity > 80 ? 'foarte aproape' : 
                similarity > 60 ? 'aproape' :
                similarity > 40 ? 'moderat diferit' : 'foarte diferit'
    }
  };
}

/**
 * Verifică dacă două rezultate sunt în același cadran
 * @param {Object} result1 - Primul rezultat
 * @param {Object} result2 - Al doilea rezultat
 * @returns {boolean}
 */
function getSameQuadrant(result1, result2) {
  const getQuadrant = (cdScore, pgScore) => {
    if (cdScore < 0 && pgScore > 0) return 'topLeft';
    if (cdScore > 0 && pgScore > 0) return 'topRight';
    if (cdScore < 0 && pgScore < 0) return 'bottomLeft';
    return 'bottomRight';
  };
  
  const q1 = getQuadrant(result1.scores.centralization, result1.scores.privatePublic);
  const q2 = getQuadrant(result2.scores.centralization, result2.scores.privatePublic);
  
  return q1 === q2;
}

/**
 * Generează recomandări pe baza rezultatelor
 * @param {Object} results - Rezultatele testului
 * @returns {Array} Lista de recomandări
 */
export function generateRecommendations(results) {
  if (!validateResults(results)) return [];
  
  const { scores } = results;
  const recommendations = [];
  
  // Recomandări bazate pe scorul de centralizare
  if (scores.centralization < -50) {
    recommendations.push("Explorează exchange-uri centralizate precum Coinbase sau Binance pentru o experiență mai sigură");
    recommendations.push("Consideră stablecoin-uri regulate pentru tranzacții mai stabile");
  } else if (scores.centralization > 50) {
    recommendations.push("Încearcă exchange-uri descentralizate precum Uniswap sau SushiSwap");
    recommendations.push("Explorează protocoale DeFi pentru mai multă autonomie financiară");
  }
  
  // Recomandări bazate pe scorul privat/public
  if (scores.privatePublic < -50) {
    recommendations.push("Investește în Bitcoin sau Ethereum pentru potențial de creștere");
    recommendations.push("Explorează NFT-uri și token-uri de gaming pentru profit");
  } else if (scores.privatePublic > 50) {
    recommendations.push("Sprijină proiecte de incluziune financiară și impact social");
    recommendations.push("Consideră investiții în blockchain-uri eco-friendly precum Algorand");
  }
  
  return recommendations;
}

/**
 * Exportă rezultatele în format pentru partajare
 * @param {Object} results - Rezultatele testului
 * @returns {Object} Date formatate pentru partajare
 */
export function formatResultsForSharing(results) {
  if (!validateResults(results)) return null;
  
  return {
    orientation: results.orientation,
    scores: {
      centralization: results.scores.centralization,
      privatePublic: results.scores.privatePublic
    },
    description: results.description.substring(0, 200) + '...',
    url: window.location.href,
    hashtags: ['#CryptoCompass', '#Web3', '#Blockchain'],
    shareText: `Am descoperit că sunt ${results.orientation} în ecosistemul crypto! Descoperă și tu orientarea ta cu Busola Politică Crypto.`
  };
}

export { orientationDescriptions }; 