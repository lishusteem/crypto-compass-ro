// Întrebări pentru testul Busola Politică Crypto

// Întrebări pentru dimensiunea Centralizare/Descentralizare  
const centralizationQuestions = [
  {
    id: 'c1',
    text: "Este crucial să verificăm identitatea utilizatorilor în tranzacțiile crypto pentru a preveni spălarea de bani și activitățile criminale.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c2', 
    text: "Confidențialitatea și anonimatul ar trebui prioritizate față de verificarea identității în tranzacțiile crypto.",
    direction: "decentralized",
    dimension: "centralization"
  },
  {
    id: 'c3',
    text: "Descentralizarea ar trebui prioritizată față de scalabilitate în tehnologia blockchain.",
    direction: "decentralized", 
    dimension: "centralization"
  },
  {
    id: 'c4',
    text: "Prefer soluții blockchain de înaltă performanță și scalabile, chiar dacă sacrifică o parte din descentralizare.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c5',
    text: "Platformele de criptomonede ar trebui să fie deschise și accesibile tuturor, fără a necesita criterii sau aprobare specifice.",
    direction: "decentralized",
    dimension: "centralization"
  },
  {
    id: 'c6',
    text: "Susțin sistemele de criptomonede cu permisiuni care au un set de reguli și criterii pentru participare.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c7', 
    text: "Măsurile de securitate puternice ar trebui prioritizate, chiar dacă rezultă într-o experiență de utilizare mai complexă.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c8',
    text: "Prefer experiențe de utilizare mai simple în criptomonede, chiar dacă măsurile de securitate pot fi mai puțin riguroase.",
    direction: "decentralized",
    dimension: "centralization"
  },
  {
    id: 'c9',
    text: "Sistemele descentralizate, fără încredere, sunt mai importante decât cele care necesită încredere în terțe părți sau entități centralizate.",
    direction: "decentralized",
    dimension: "centralization"
  },
  {
    id: 'c10',
    text: "Cred că încrederea în terțe părți sau entități centralizate este necesară pentru ca sistemele de criptomonede să funcționeze eficient.",
    direction: "centralized", 
    dimension: "centralization"
  },
  {
    id: 'c11',
    text: "Reglementarea guvernamentală a criptomonedelor este necesară pentru a proteja utilizatorii și a menține stabilitatea.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c12',
    text: "Criptomonedele ar trebui să fie auto-guvernate fără interferențe din partea guvernelor sau autorităților centrale.",
    direction: "decentralized",
    dimension: "centralization"
  },
  {
    id: 'c13',
    text: "Exchange-urile centralizate sunt mai sigure și mai fiabile decât exchange-urile descentralizate.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c14',
    text: "Exchange-urile descentralizate sunt mai reziliente și se aliniază mai bine cu principiile criptomonedelor.",
    direction: "decentralized",
    dimension: "centralization"
  },
  {
    id: 'c15',
    text: "Dezvoltarea tehnologiei blockchain ar trebui să fie ghidată de o autoritate centralizată.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c16',
    text: "Ar trebui să existe o \"listă neagră\" globală pentru adresele crypto asociate cu activități ilegale.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c17',
    text: "Wallet-urile crypto ar trebui să poată fi înghețate de autorități în cazuri de urgență națională.",
    direction: "centralized",
    dimension: "centralization"
  },
  {
    id: 'c18',
    text: "Smart contract-urile ar trebui să fie imuabile, chiar dacă conțin bug-uri sau sunt folosite pentru fraude.",
    direction: "decentralized",
    dimension: "centralization"
  }
];

// Întrebări pentru dimensiunea Bun Privat/Public
const privatePublicQuestions = [
  {
    id: 'p1',
    text: "Criptomonedele ar trebui să servească în principal ca mediu de schimb și token de utilitate.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p2', 
    text: "Criptomonedele ar trebui să funcționeze în principal ca rezervă de valoare și aur digital.",
    direction: "private",
    dimension: "privatePublic"
  },
  {
    id: 'p3',
    text: "Impactul asupra mediului al criptomonedelor ar trebui minimizat, chiar dacă încetinește inovația tehnologică.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p4',
    text: "Avansul tehnologic în criptomonede ar trebui prioritizat față de preocupările legate de mediu.",
    direction: "private",
    dimension: "privatePublic"
  },
  {
    id: 'p5',
    text: "Criptomonedele ar trebui să se concentreze în principal pe incluziunea financiară și împuternicirea socială.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p6',
    text: "Generarea de profit și acumularea de avere ar trebui să fie principalul focus al criptomonedelor.",
    direction: "private", 
    dimension: "privatePublic"
  },
  {
    id: 'p7',
    text: "Criptomonedele au potențialul de a îmbunătăți semnificativ incluziunea financiară globală.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p8',
    text: "Impactul asupra mediului al criptomonedelor este o preocupare majoră care ar trebui abordată.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p9',
    text: "Cred că criptomonedele pot conduce la avansuri tehnologice semnificative.",
    direction: "private",
    dimension: "privatePublic"
  },
  {
    id: 'p10',
    text: "Criptomonedele au potențialul de a crea noi oportunități economice și de a redistribui bogăția.",
    direction: "public",
    dimension: "privatePublic" 
  },
  {
    id: 'p11',
    text: "Proiectele de criptomonede ar trebui să prioritizeze filantropia și dezvoltarea comunității.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p12',
    text: "Proiectele de criptomonede ar trebui să prioritizeze succesul comercial și profitabilitatea.",
    direction: "private",
    dimension: "privatePublic"
  },
  {
    id: 'p13',
    text: "Aș investi într-un proiect de criptomonede care se concentrează pe sustenabilitatea mediului în locul profiturilor potențiale.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p14',
    text: "Aș investi într-un proiect de criptomonede care prioritizează profiturile potențiale față de sustenabilitatea mediului.",
    direction: "private",
    dimension: "privatePublic"
  },
  {
    id: 'p15',
    text: "Criptomonedele ar trebui să sprijine procesele de luare a deciziilor transparente și democratice.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p16',
    text: "Protocoalele crypto ar trebui să taxeze automat tranzacțiile pentru a finanța bunuri publice.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p17',
    text: "Maximizarea valorii pentru deținători ar trebui să fie singurul obiectiv al proiectelor crypto.",
    direction: "private",
    dimension: "privatePublic"
  },
  {
    id: 'p18',
    text: "Protocoalele DeFi ar trebui să ofere rate preferențiale pentru împrumuturi în țări sărace.",
    direction: "public",
    dimension: "privatePublic"
  },
  {
    id: 'p19',
    text: "Manipularea pieței crypto este parte din joc și nu ar trebui reglementată.",
    direction: "private",
    dimension: "privatePublic"
  },
  {
    id: 'p20',
    text: "Ar trebui să existe un venit de bază universal plătit în crypto pentru toți cetățenii lumii.",
    direction: "public",
    dimension: "privatePublic"
  }
];

// Funcție pentru amestecarea unui array (algoritm Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Funcție pentru generarea setului de întrebări pentru test
export const generateQuestionSet = () => {
  // Amestecăm și selectăm 15 întrebări din fiecare dimensiune
  const selectedCentralization = shuffleArray(centralizationQuestions).slice(0, 15);
  const selectedPrivatePublic = shuffleArray(privatePublicQuestions).slice(0, 15);
  
  // Combinăm și amestecăm întrebările finale
  const allQuestions = shuffleArray([...selectedCentralization, ...selectedPrivatePublic]);
  
  return allQuestions;
};

// Funcție pentru obținerea unei întrebări după ID
export const getQuestionById = (questionId) => {
  const allQuestions = [...centralizationQuestions, ...privatePublicQuestions];
  return allQuestions.find(q => q.id === questionId);
};

// Funcție pentru validarea unui răspuns
export const validateAnswer = (answer) => {
  return answer && answer.value >= 1 && answer.value <= 5;
};

// Funcție pentru calcularea progresului testului
export const calculateProgress = (currentQuestion, totalQuestions) => {
  return Math.round((currentQuestion / totalQuestions) * 100);
};

// Funcție pentru salvarea progresului în localStorage
export const saveProgress = (currentQuestion, answers, questions) => {
  const progress = {
    currentQuestion,
    answers,
    questions,
    timestamp: Date.now(),
    version: "1.0"
  };
  
  try {
    localStorage.setItem('crypto_compass_test_progress', JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Nu s-a putut salva progresul:', error);
    return false;
  }
};

// Funcție pentru încărcarea progresului din localStorage
export const loadProgress = () => {
  try {
    const saved = localStorage.getItem('crypto_compass_test_progress');
    if (!saved) return null;
    
    const progress = JSON.parse(saved);
    
    // Verificăm dacă progresul nu este prea vechi (24 ore)
    const maxAge = 24 * 60 * 60 * 1000; // 24 ore în milisecunde
    if (Date.now() - progress.timestamp > maxAge) {
      localStorage.removeItem('crypto_compass_test_progress');
      return null;
    }
    
    return progress;
  } catch (error) {
    console.error('Nu s-a putut încărca progresul:', error);
    localStorage.removeItem('crypto_compass_test_progress');
    return null;
  }
};

// Funcție pentru ștergerea progresului
export const clearProgress = () => {
  try {
    localStorage.removeItem('crypto_compass_test_progress');
    return true;
  } catch (error) {
    console.error('Nu s-a putut șterge progresul:', error);
    return false;
  }
};

// Funcție pentru verificarea dacă toate întrebările au fost răspunse
export const areAllQuestionsAnswered = (answers, questions) => {
  return questions.every(question => 
    answers[question.id] && validateAnswer(answers[question.id])
  );
};

// Funcție pentru obținerea următoarei întrebări fără răspuns
export const getNextUnansweredQuestion = (answers, questions) => {
  return questions.findIndex(question => 
    !answers[question.id] || !validateAnswer(answers[question.id])
  );
};

// Funcție pentru statistici despre progresul testului
export const getTestStatistics = (answers, questions) => {
  const answeredCount = questions.filter(question => 
    answers[question.id] && validateAnswer(answers[question.id])
  ).length;
  
  const centralizationAnswered = questions.filter(question =>
    question.dimension === 'centralization' && 
    answers[question.id] && 
    validateAnswer(answers[question.id])
  ).length;
  
  const privatePublicAnswered = questions.filter(question =>
    question.dimension === 'privatePublic' && 
    answers[question.id] && 
    validateAnswer(answers[question.id])
  ).length;
  
  return {
    total: questions.length,
    answered: answeredCount,
    remaining: questions.length - answeredCount,
    centralizationAnswered,
    privatePublicAnswered,
    progressPercentage: Math.round((answeredCount / questions.length) * 100)
  };
};

// Export toate seturile de întrebări pentru debugging/testing
export { centralizationQuestions, privatePublicQuestions };