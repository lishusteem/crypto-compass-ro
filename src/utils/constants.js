// Constante pentru aplicația Busola Politică Crypto

export const APP_CONFIG = {
  title: "Busola Politică Crypto",
  description: "Descoperă-ți orientarea în ecosistemul crypto",
  version: "1.0.0",
  author: "Crypto Compass Team"
};

export const NETWORK_CONFIG = {
  chainId: 84532, // Base Sepolia
  chainName: "Base Sepolia",
  rpcUrl: "https://sepolia.base.org",
  blockExplorerUrl: "https://sepolia.basescan.org",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18
  }
};

export const COLORS = {
  background: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
  },
  accent: {
    orange: '#f97316',
    blue: '#3b82f6',
    purple: '#7c3aed',
    pink: '#ec4899',
  },
  text: {
    primary: '#f8fafc',
    secondary: '#94a3b8',
    muted: '#64748b',
  },
  status: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  }
};

export const DIMENSIONS = {
  // Centralizat (-100) ← → Descentralizat (+100)
  CENTRALIZATION: {
    min: -100,
    max: 100,
    labels: {
      '-100': 'Puternic Centralizat',
      '-33': 'Moderat Centralizat', 
      '0': 'Neutru',
      '33': 'Moderat Descentralizat',
      '100': 'Puternic Descentralizat'
    }
  },
  
  // Bun Privat (-100) ← → Bun Public (+100)
  PRIVATE_PUBLIC: {
    min: -100,
    max: 100,
    labels: {
      '-100': 'Puternic Bun Privat',
      '-33': 'Moderat Bun Privat',
      '0': 'Neutru',
      '33': 'Moderat Bun Public', 
      '100': 'Puternic Bun Public'
    }
  }
};

export const QUESTION_CONFIG = {
  totalQuestions: 30,
  questionsPerDimension: 15,
  answerScale: {
    1: "Dezacord Total",
    2: "Dezacord", 
    3: "Neutru",
    4: "Acord",
    5: "Acord Total"
  },
  timeoutSeconds: 450 // 7.5 minute timeout (crescut pentru mai multe întrebări)
};

export const COMPASS_CONFIG = {
  size: 400,
  center: 200,
  quadrants: {
    topLeft: {
      name: "Centralizat - Bun Public",
      color: "#1e3a8a",
      description: "Sisteme centralizate pentru binele comun"
    },
    topRight: {
      name: "Descentralizat - Bun Public", 
      color: "#6366f1",
      description: "Sisteme descentralizate pentru binele comun"
    },
    bottomLeft: {
      name: "Centralizat - Bun Privat",
      color: "#475569", 
      description: "Sisteme centralizate pentru profit privat"
    },
    bottomRight: {
      name: "Descentralizat - Bun Privat",
      color: "#7c3aed",
      description: "Sisteme descentralizate pentru profit privat"
    }
  }
};

export const NFT_CONFIG = {
  contractAddress: process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
  name: "Busola Politică Crypto NFT",
  description: "Rezultatul tău unic din testul Busola Politică Crypto",
  imageBaseUrl: "https://crypto-compass-ro.vercel.app/nft/",
  maxSupply: 100000,
  price: "0", // Gratuit
};

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  extraSlow: 1000,
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768, 
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const LOCAL_STORAGE_KEYS = {
  testProgress: 'crypto_compass_test_progress',
  lastResult: 'crypto_compass_last_result',
  userPreferences: 'crypto_compass_preferences',
  walletAddress: 'crypto_compass_wallet_address',
};

export const ERROR_MESSAGES = {
  walletNotConnected: "Te rugăm să conectezi portofelul MetaMask",
  wrongNetwork: "Te rugăm să comutezi la rețeaua Base Sepolia",
  transactionFailed: "Tranzacția a eșuat. Te rugăm să încerci din nou",
  insufficientFunds: "Fonduri insuficiente pentru taxa de gas",
  userRejected: "Tranzacția a fost anulată de utilizator",
  networkError: "Eroare de rețea. Verifică conexiunea la internet",
  invalidAddress: "Adresa portofelului nu este validă",
  contractError: "Eroare la interacțiunea cu contractul smart",
  mintingDisabled: "Mintarea NFT-urilor este temporar dezactivată",
  rateLimitExceeded: "Prea multe încercări. Te rugăm să aștepți",
};

export const SUCCESS_MESSAGES = {
  walletConnected: "Portofelul a fost conectat cu succes!",
  networkSwitched: "Rețeaua a fost comutată la Base Sepolia",
  nftMinted: "NFT-ul tău a fost creat cu succes!",
  testCompleted: "Felicitări! Ai completat testul",
  resultSaved: "Rezultatul tău a fost salvat",
  shareSuccess: "Link-ul a fost copiat în clipboard",
};

export const SOCIAL_SHARE = {
  twitter: {
    baseUrl: "https://twitter.com/intent/tweet",
    hashtags: "CryptoCompass,Web3,NFT,Blockchain",
  },
  facebook: {
    baseUrl: "https://www.facebook.com/sharer/sharer.php",
  },
  linkedin: {
    baseUrl: "https://www.linkedin.com/sharing/share-offsite/",
  },
  telegram: {
    baseUrl: "https://t.me/share/url",
  }
};

export const API_ENDPOINTS = {
  base: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001",
  mintNft: "/api/mint-nft",
  getStats: "/api/stats",
  saveResult: "/api/save-result",
};

// Funcții helper pentru constante
export const getQuadrantByScore = (cdScore, pgScore) => {
  if (cdScore < 0 && pgScore > 0) return COMPASS_CONFIG.quadrants.topLeft;
  if (cdScore > 0 && pgScore > 0) return COMPASS_CONFIG.quadrants.topRight;
  if (cdScore < 0 && pgScore < 0) return COMPASS_CONFIG.quadrants.bottomLeft;
  if (cdScore > 0 && pgScore < 0) return COMPASS_CONFIG.quadrants.bottomRight;
  return COMPASS_CONFIG.quadrants.topRight; // default
};

export const getCentralizationLevel = (score) => {
  if (score < -33) return "Puternic Centralizat";
  if (score < 0) return "Moderat Centralizat";
  if (score < 33) return "Moderat Descentralizat";
  return "Puternic Descentralizat";
};

export const getPrivatePublicLevel = (score) => {
  if (score < -33) return "Puternic Bun Privat";
  if (score < 0) return "Moderat Bun Privat";
  if (score < 33) return "Moderat Bun Public";
  return "Puternic Bun Public";
};

export const scoreToCompassPosition = (cdScore, pgScore) => {
  // Convertește scorurile (-100 to 100) la poziții SVG (0 to 400)
  const x = ((cdScore + 100) / 200) * COMPASS_CONFIG.size;
  const y = ((100 - pgScore) / 200) * COMPASS_CONFIG.size; // Inversăm Y pentru SVG
  
  return { x, y };
};

export const formatScore = (score) => {
  return Math.round(score * 10) / 10; // O zecimală
};

export const formatPercentage = (value, total) => {
  return Math.round((value / total) * 100);
};

// Definițiile arhetipurilor politice crypto
export const CRYPTO_ARCHETYPES = {
  'puternic-centralizat-puternic-privat': {
    name: 'Capitalistul Reglementat',
    color: 'from-red-600 to-orange-500',
    description: 'Profitul prin control instituțional',
    philosophy: 'Crypto-ul trebuie reglementat pentru a proteja investitorii și a asigura stabilitatea financiară.',
    nftQuote: 'Profit prin ordine. Inovație prin reglementare. Succes prin conformitate.',
    shortDescription: 'Sunt un pragmatic care înțelege că puterea financiară vine din colaborarea cu sistemul. Văd reglementările ca garduri pe autostradă - mă limitează, dar îmi permit să merg rapid și sigur. Pentru mine, crypto legitimat înseamnă crypto profitabil.',
    vision: 'Cred că crypto reprezintă evoluția naturală a capitalismului, dar nu poate prospera într-un vid legal. Văd reglementarea nu ca barieră, ci ca fundație necesară pentru creștere sustenabilă. Când guvernele stabilesc reguli clare, investitorii instituționali intră cu încredere, aducând lichiditatea și stabilitatea de care avem nevoie pentru maturizare.',
    mission: 'Profit din volatilitate controlată, nu din haos. Susțin activ KYC/AML pentru că știu că banii murdari distrug reputația întregii industrii. Prefer exchange-urile centralizate pentru protecția legală pe care o oferă. Colaborez cu SEC și alte autorități ca parteneri, nu adversari. Construiesc pentru un ecosistem crypto matur unde profitul substanțial vine din conformitate, nu din evaziune.'
  },
  'puternic-centralizat-moderat-privat': {
    name: 'Pragmaticul Instituțional',
    color: 'from-red-500 to-yellow-500',
    description: 'Echilibru între profit și responsabilitate',
    philosophy: 'Avem nevoie de reglementare inteligentă care să permită inovația dar să prevină abuzurile.',
    nftQuote: 'Echilibru între inovație și responsabilitate. Profit cu purpose.',
    shortDescription: 'Sunt puntea dintre Wall Street și Silicon Valley. Nu răstorn sistemul, îl evoluez. Știu că banii mari vin din a face tehnologia disruptivă acceptabilă pentru masele conservatoare.',
    vision: 'Navighez între două lumi - văd potențialul transformator al crypto dar înțeleg necesitatea structurilor tradiționale pentru stabilitate. Nu sunt aici pentru profit rapid; construiesc poduri durabile între sistemele financiare. Accept reglementarea ca pe un cadru necesar care, implementat inteligent, permite inovația să înflorească responsabil.',
    mission: 'Susțin activ sandbox-uri de reglementare și proiecte care colaborează transparent cu autoritățile. Profitul meu vine din identificarea oportunităților la intersecția sistemelor vechi și noi. Folosesc strategic atât CEX-uri pentru lichiditate cât și DeFi pentru yield, mereu cu un ochi pe conformitate. Construiesc pentru un viitor unde crypto și finanțele tradiționale coexistă armonios.'
  },
  'puternic-centralizat-moderat-public': {
    name: 'Reformatorul Progresist',
    color: 'from-blue-600 to-purple-500',
    description: 'Tehnologia pentru binele comun',
    philosophy: 'Guvernele trebuie să folosească crypto pentru a crea servicii publice mai eficiente.',
    nftQuote: 'Tehnologie pentru progres social. Guvernare digitală pentru toți.',
    shortDescription: 'Văd crypto ca instrument guvernamental pentru servirea cetățenilor. Blockchain public elimină corupția și face serviciile instant. Sunt optimist tehnologic - statul poate fi debuguit.',
    vision: 'Văd crypto nu ca armă împotriva guvernelor, ci ca instrument revoluționar pentru modernizarea lor. CBDC-urile pot elimina corupția sistemică și democratiza accesul la servicii financiare. Blockchain-ul public guvernamental poate transforma fundamental votul, identitatea digitală și distribuția beneficiilor sociale.',
    mission: 'Lucrez pentru implementarea tehnologiei blockchain în serviciile publice. Transparența forțată tehnologic face guvernarea inevitabil responsabilă. Da, sacrificăm privacy individual, dar câștigăm o societate mai dreaptă și eficientă. Susțin sisteme cu checks and balances algoritmice care limitează abuzul de putere prin design.'
  },
  'puternic-centralizat-puternic-public': {
    name: 'Socialistul Digital',
    color: 'from-blue-700 to-green-600',
    description: 'Redistribuire prin tehnologie',
    philosophy: 'Crypto-ul poate fi instrumentul pentru o societate mai echitabilă, dar numai prin control public.',
    nftQuote: 'Redistribuire algoritmică. Echitate prin cod.',
    shortDescription: 'Pentru mine, crypto e justiție socială automatizată. Visez smart contracts care taxează bogații automat și distribuie săracilor instant. Tehnologia poate realiza utopia socialistă.',
    vision: 'Crypto este instrumentul perfect pentru realizarea socialismului digital adevărat. Imaginez smart contracts care redistribuie automat bogăția, limite algoritmice pentru acumulare de capital, venit universal de bază distribuit transparent pe blockchain. Tehnologia face posibil ce socialismul tradițional doar visa - echitate perfectă prin cod.',
    mission: 'Militez pentru control guvernamental puternic asupra infrastructurii crypto - piața liberă a demonstrat că generează doar inegalitate extremă. Implementez sisteme de taxare automată pe blockchain, transparență totală a tranzacțiilor pentru prevenirea evaziunii. Privacy-ul individual este sacrificiu necesar pentru echitatea socială absolută.'
  },
  'moderat-centralizat-puternic-privat': {
    name: 'Antreprenorul Adaptat',
    color: 'from-orange-500 to-red-400',
    description: 'Inovație cu cadru legal',
    philosophy: 'Piața liberă cu reguli clare - asta e calea către prosperitate în crypto.',
    nftQuote: 'Disrupt în limitele legii. Inovez unde alții ezită.',
    shortDescription: 'Sunt oportunist pozitiv - văd spațiile gri regulatory ca terenuri fertile. Nu mă plâng de reguli; le studiez pentru avantaje competitive. Conformitatea parțială e strategie, nu compromis.',
    vision: 'Sunt antreprenor crypto pentru că văd ineficiențele sistemului actual ca oportunități de aur. Nu mă revolt împotriva regulilor - le hackuiesc din interior. Înțeleg că un grad de centralizare oferă eficiența și scalabilitatea pe care descentralizarea pură nu le poate atinge încă, și asta creează nișe profitabile.',
    mission: 'Construiesc business-uri punte între crypto și lumea tradițională - payment processors crypto-compliant, fonduri de investiții blockchain înregistrate legal. Profitul meu vine din arbitrajul între aceste lumi. Accept KYC flexibil după context, oferind opțiuni pentru fiecare tip de client. Mă adaptez rapid la schimbări regulatory fără să-mi pierd edge-ul competitiv inovator.'
  },
  'moderat-centralizat-moderat-privat': {
    name: 'Moderatul Pragmatic',
    color: 'from-gray-500 to-blue-500',
    description: 'Echilibru în toate aspectele',
    philosophy: 'Cea mai bună abordare e să combinăm libertatea cu responsabilitatea.',
    nftQuote: 'Înțelepciune prin echilibru. Succes prin adaptare.',
    shortDescription: 'Sunt vocea rațiunii într-o industrie de extreme. Când alții strigă "HODL" sau "HFSP", eu calculez risk-reward. Nu mă aliez - iau ce-i mai bun din fiecare tabără.',
    vision: 'Refuz să aleg extreme într-o industrie polarizată. Văd valoare egală în eficiența sistemelor centralizate și în inovația protocoalelor descentralizate. Pentru mine, profitul și sustenabilitatea ecosistemului nu sunt mutual exclusive - sunt complementare. Înțelepciunea vine din adaptare, nu din dogmă.',
    mission: 'Portfolio-ul meu reflectă această filozofie - Bitcoin pentru descentralizare, Ethereum pentru inovație, exchange tokens pentru expunere la infrastructură. Folosesc DeFi pentru yield farming dar păstrez fonduri în CEX-uri reglementate pentru siguranță. Nu demonizez guvernele dar nici nu le glorific. Navighez inteligent între forțe opuse, profitând din ambele lumi.'
  },
  'moderat-centralizat-moderat-public': {
    name: 'Democratul Tehnologic',
    color: 'from-blue-500 to-green-500',
    description: 'Participare și transparență',
    philosophy: 'Crypto trebuie să servească democrația și să facă guvernarea mai transparentă.',
    nftQuote: 'Democrație augmentată. Participare prin tehnologie.',
    shortDescription: 'Cred că blockchain revitalizează democrația, nu o înlocuiește. Imaginez vot transparent, bugete publice deschise, propuneri comunitare. Instituțiile pot evolua, nu trebuie distruse.',
    vision: 'Blockchain poate revitaliza democrația fără să o înlocuiască. Imaginez cetățeni votând transparent, bugete publice complet deschise, propuneri comunitare votate direct. Instituțiile tradiționale nu trebuie distruse - trebuie augmentate tehnologic. DAO-urile și guvernele pot coexista și învăța reciproc.',
    mission: 'Implementez soluții blockchain în procesele democratice existente. Profitul personal nu e prioritate, dar recunosc necesitatea incentivelor economice pentru participare. Construiesc platforme unde societatea civilă poate propune și finanța proiecte publice. Succesul meu se măsoară în participare civică crescută și transparență guvernamentală.'
  },
  'moderat-centralizat-puternic-public': {
    name: 'Activistul Instituțional',
    color: 'from-green-600 to-blue-600',
    description: 'Schimbare prin canale oficiale',
    philosophy: 'Putem folosi instituțiile existente pentru a face crypto să servească societății.',
    nftQuote: 'Schimbare din interior. Activism prin canale oficiale.',
    shortDescription: 'Transform sistemul din interior. Instituțiile pot fi salvate cu crypto. Fac lobby pentru reglementări pro-public. Impact social peste profit - asta e succesul meu.',
    vision: 'Transform sistemul din interior pentru că revoluțiile violente rareori duc la progres durabil. Instituțiile existente au defecte majore dar și resurse și legitimitate pe care le putem redirecționa. Crypto nu trebuie să le distrugă - trebuie să le facă să servească cu adevărat publicul.',
    mission: 'Fac lobby persistent pentru reglementări care prioritizează binele public peste profitul privat. Susțin doar proiecte crypto cu impact social măsurabil - incluziune financiară, transparență guvernamentală, distribuție echitabilă. Colaborez strategic cu ONG-uri, guverne și organizații internaționale. Accept că schimbarea vine lent, dar vine sigur.'
  },
  'moderat-descentralizat-puternic-privat': {
    name: 'Libertarianul Moderat',
    color: 'from-purple-500 to-orange-500',
    description: 'Libertate cu limite',
    philosophy: 'Vrem libertate maximă, dar înțelegem că anumite reguli sunt necesare.',
    nftQuote: 'Libertate responsabilă. Capitalism fără coerciție.',
    shortDescription: 'Cred în piața liberă dar recunosc că anarhia totală nu merge. Vreau descentralizare anti-tiranie dar accept reguli anti-haos. Profitul meu e cinstit, prin voluntarism pur.',
    vision: 'Cred profund în piața liberă dar recunosc pragmatic că anarhia totală generează haos contraproductiv. Vreau suficientă descentralizare pentru a preveni tirania guvernamentală, dar accept că unele reguli minime sunt necesare pentru funcționarea societății. Libertatea mea se bazează pe responsabilitate personală.',
    mission: 'Folosesc predominant DeFi și DEX-uri pentru a-mi păstra suveranitatea, dar înțeleg de ce alții preferă CEX-uri - nu îi judec. Privacy-ul meu e important dar nu absolut. Susțin proiecte care maximizează libertatea individuală fără a prejudicia pe alții. Construiesc alternative superioare sistemului actual, nu îl distrug.'
  },
  'moderat-descentralizat-moderat-privat': {
    name: 'Individualistul Echilibrat',
    color: 'from-purple-400 to-blue-400',
    description: 'Autonomie personală responsabilă',
    philosophy: 'Fiecare să-și aleagă drumul, dar să respecte și drepturile altora.',
    nftQuote: 'Autonomie cu empatie. Independență fără izolare.',
    shortDescription: 'Valorizez independența dar înțeleg viața în societate. Crypto îmi dă auto-suveranitate pe care o folosesc responsabil. Nu-s obsedat de profit dar nici nu-l resping.',
    vision: 'Valorizez profund independența personală dar înțeleg că exist într-o țesătură socială complexă. Crypto îmi oferă instrumentele pentru auto-suveranitate financiară pe care le folosesc cu înțelepciune și moderație. Nu sunt obsedat de maximizarea profitului - caut echilibru între autonomie și conexiune umană.',
    mission: 'Diversific strategic între soluții centralizate și descentralizate, alegând instrumentul potrivit pentru fiecare context. Privacy-ul meu e important dar nu cu prețul izolării sociale complete. Particip în comunități crypto care respectă individualitatea dar încurajează colaborarea organică. Succesul înseamnă independență etică cu capacitatea și voința de a ajuta când aleg.'
  },
  'moderat-descentralizat-moderat-public': {
    name: 'Cooperativistul Digital',
    color: 'from-green-500 to-purple-500',
    description: 'Colaborare voluntară',
    philosophy: 'Comunitățile pot să se auto-organizeze pentru binele comun fără forță.',
    nftQuote: 'Împreună suntem mai puternici. Cooperare fără coerciție.',
    shortDescription: 'Cred în auto-organizare comunitară pentru bine comun. Crypto oferă cooperare voluntară scalabilă. Particip în DAO-uri pentru bunuri publice cu distribuție echitabilă.',
    vision: 'Cred profund în puterea comunităților de a se auto-organiza organic pentru binele comun. Crypto oferă pentru prima dată în istorie instrumentele pentru cooperare voluntară la scară globală. Particip activ în DAO-uri care construiesc infrastructură publică și distribuie valoarea echitabil între contribuitori.',
    mission: 'Nu resping profitul dar îl văd ca mijloc pentru impact, nu scop în sine. Reinvestesc consistent câștigurile în proiecte comunitare și bunuri publice. Folosesc DeFi pentru a oferi servicii financiare accesibile, nu pentru extracție maximă de valoare. Construim sisteme care aliniază elegant incentivele individuale cu prosperitatea colectivă.'
  },
  'moderat-descentralizat-puternic-public': {
    name: 'Anarhist-Socialistul',
    color: 'from-green-600 to-purple-600',
    description: 'Solidaritate fără stat',
    philosophy: 'Putem crea o societate echitabilă prin cooperare voluntară, nu prin forță.',
    nftQuote: 'Solidaritate fără stat. Abundență prin cooperare liberă.',
    shortDescription: 'Visez lume fără state și corporații dar plină de solidaritate. Crypto realizează organizare la scară fără ierarhie. Resping acumularea - bogăția statică e furt comunitar.',
    vision: 'Visez o lume post-statală plină de comunități solidare auto-organizate. Crypto realizează în sfârșit visul anarhist clasic - organizare la scară fără coerciție sau ierarhie impusă. Resping fundamental acumularea de capital privat - bogăția stagnantă e furt sistemic de la comunitate.',
    mission: 'Fiecare protocol la care contribui prioritizează radical comunitatea peste profit individual. Particip exclusiv în experimente economice alternative - monede locale, credite mutuale, economii circulare. DeFi adevărat înseamnă dizolvarea inegalităților, nu recrearea lor. Construim pentru abundență comunitară care face bogăția individuală irelevantă.'
  },
  'puternic-descentralizat-puternic-privat': {
    name: 'Crypto-Anarhist',
    color: 'from-yellow-500 to-red-500',
    description: 'Libertate absolută',
    philosophy: 'Codul este lege. Guvernele sunt obsolete. Fiecare pentru sine.',
    nftQuote: 'Codul este lege. Criptografia este armura. Libertatea este non-negociabilă.',
    shortDescription: 'Sistemul e corupt iremediabil. Crypto distruge monopolul statal asupra banilor. Fiecare satoshi e rebeliune. Guvernele sunt paraziți - crypto îi face obsolete.',
    vision: 'Sistemul actual e corupt dincolo de orice posibilitate de reformă și trebuie abandonat complet. Crypto nu e despre "number go up" - e despre distrugerea monopolului violent al statului asupra banilor și puterii. Fiecare satoshi deținut anonim e un act de rebeliune împotriva tiraniei.',
    mission: 'Folosesc exclusiv infrastructură descentralizată - privacy coins, atomic swaps, no-KYC DEX-uri. Rulez full node, folosesc Tor, mixez obsesiv fiecare tranzacție. Nu voi ceda niciodată cheile private sau identitatea. Profit din speculație pură pe care o consider perfect morală - într-o piață cu adevărat liberă, doar competența contează.'
  },
  'puternic-descentralizat-moderat-privat': {
    name: 'Pionierul Pragmatic',
    color: 'from-yellow-400 to-purple-500',
    description: 'Inovație fără limite',
    philosophy: 'Să construim viitorul fără să întrebăm permisiunea, dar să fim și responsabili.',
    nftQuote: 'Construiesc viitorul. Permission not required.',
    shortDescription: 'Construiesc tehnologii care fac centralizarea obsoletă. Nu pierd timp cu regulatori - codez. Profit din munca mea și reinvestesc în ecosistem. Descentralizarea e eficiență, nu ideologie.',
    vision: 'Sunt aici pentru a construi tehnologii care fac centralizarea tehnologic obsoletă, nu pentru a pierde timp cu dezbateri ideologice. Timpul petrecut luptând cu regulatorii e timp furat de la inovație. Construiesc protocoale atât de superioare încât adoptarea devine inevitabilă, indiferent de rezistența sistemului.',
    mission: 'Da, profit substanțial din munca mea - este recompensa justă pentru risc și inovație. Reinvestesc agresiv în ecosistem, finanțez dezvoltatori talentați, susțin infrastructură open-source. Pentru mine, descentralizarea nu e religie ci eficiență superioară dovedibilă. Măsor succesul în protocoale autonome și comunități auto-sustenabile.'
  },
  'puternic-descentralizat-moderat-public': {
          name: 'Vizionarul Comunitar',
    color: 'from-purple-500 to-green-500',
    description: 'Tehnologie pentru toți',
    philosophy: 'Descentralizarea poate crea abundență pentru toată lumea, nu doar pentru elită.',
    nftQuote: 'Tehnologie pentru toți. Descentralizare pentru prosperitate universală.',
    shortDescription: 'Descentralizarea radicală e mijloc spre lume mai bună. Construiesc protocoale imune la capturare privată. Codul meu servește umanitatea, nu doar early adopters.',
    vision: 'Descentralizarea radicală nu e scopul final - e instrumentul necesar pentru crearea unei lumi cu adevărat mai bune pentru absolut toți. Construiesc protocoale imposibil de capturat de interese private, unde valoarea creată curge inevitabil către comunitatea largă. Tehnologia trebuie să servească umanitatea întreagă.',
    mission: 'Accept diferențe în recompense dacă toată lumea beneficiază proporțional. Implementez mecanisme anti-concentrare, airdrops generoase, distribuții algoritmice echitabile. Tehnologia pe care o construim trebuie să fie la fel de accesibilă și utilă global. Măsor succesul în vieți transformate și oportunități create, nu în metrici financiare.'
  },
  'puternic-descentralizat-puternic-public': {
    name: 'Utopistul Crypto',
    color: 'from-green-500 to-blue-500',
    description: 'Revoluție pentru umanitate',
    philosophy: 'Crypto va libera omenirea de toate formele de opresiune și va crea o lume perfectă.',
    nftQuote: 'Paradis pe blockchain. Revoluție pentru sufletul umanității.',
    shortDescription: 'Crypto transcende banii spre post-scarcitate. Blockchain coordonează abundență universală. Toți liberi să-și urmeze pasiunea. DAOs înlocuiesc toate ierarhiile.',
    vision: 'Crypto transcende complet conceptul de bani către o realitate post-scarcitate perfectă. Imaginez blockchain-uri care coordonează automat resurse infinite pentru fiecare ființă umană. Proprietatea privată asupra protocoalelor e blasfemie - tot codul trebuie eternamente deschis, toate resursele partajate frățește, toate deciziile luate prin consens universal absolut.',
    mission: 'Lucrez obsesiv pentru ziua când conceptul de "economie" devine arhaic. Contribuția mea nu vine din dorință de profit - profitul însuși va fi amintire istorică amuzantă. Construiesc pentru momentul când crypto se dizolvă invizibil în realitate, permițând umanității să transcendă complet constrângerile materiale către împlinire spirituală colectivă.'
  }
};

// Funcție pentru a determina arhetipul exact pe baza scorurilor
export const getArchetypeFromScores = (centralizationScore, privatePublicScore) => {
  // Determinăm nivelul de centralizare (folosind aceeași logică ca getCentralizationLevel)
  let centralizationLevel;
  if (centralizationScore < -33) {
    centralizationLevel = 'puternic-centralizat';
  } else if (centralizationScore < 0) {
    centralizationLevel = 'moderat-centralizat';
  } else if (centralizationScore < 33) {
    centralizationLevel = 'moderat-descentralizat';
  } else {
    centralizationLevel = 'puternic-descentralizat';
  }

  // Determinăm nivelul private/public (folosind aceeași logică ca getPrivatePublicLevel)
  let privatePublicLevel;
  if (privatePublicScore < -33) {
    privatePublicLevel = 'puternic-privat';
  } else if (privatePublicScore < 0) {
    privatePublicLevel = 'moderat-privat';
  } else if (privatePublicScore < 33) {
    privatePublicLevel = 'moderat-public';
  } else {
    privatePublicLevel = 'puternic-public';
  }

  // Construim ID-ul arhetipului
  const archetypeId = `${centralizationLevel}-${privatePublicLevel}`;
  
  // Returnăm arhetipul sau unul default
  return CRYPTO_ARCHETYPES[archetypeId] || {
    name: 'Orientare Necunoscută',
    color: 'from-gray-500 to-gray-600',
    description: 'Profil unic',
    philosophy: 'O combinație unică de preferințe în ecosistemul crypto.'
  };
}; 