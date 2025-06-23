import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { generateQuestionSet, loadProgress, saveProgress } from '../utils/questions.js';
import { LOCAL_STORAGE_KEYS } from '../utils/constants.js';

// Context-ul aplicației
const AppContext = createContext();

// Tipuri de acțiuni pentru reducer
const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION',
  SET_ANSWER: 'SET_ANSWER',
  SET_RESULTS: 'SET_RESULTS',
  SET_WALLET_STATE: 'SET_WALLET_STATE',
  RESET_TEST: 'RESET_TEST',
  LOAD_PROGRESS: 'LOAD_PROGRESS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Starea inițială
const initialState = {
  // Starea testului
  questions: [],
  currentQuestion: 0,
  answers: {},
  results: null,
  testCompleted: false,
  
  // Starea wallet-ului
  wallet: {
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isCorrectNetwork: false,
  },
  
  // Starea generală
  loading: {
    app: false,
    wallet: false,
    test: false,
    minting: false,
  },
  
  // Errori
  error: null,
  
  // Configurări
  theme: 'dark',
  language: 'ro',
};

// Reducer pentru gestionarea stării
function appReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.value,
        },
      };
      
    case ACTION_TYPES.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        currentQuestion: 0,
        answers: {},
        testCompleted: false,
      };
      
    case ACTION_TYPES.SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };
      
    case ACTION_TYPES.SET_ANSWER:
      const newAnswers = {
        ...state.answers,
        [action.payload.questionId]: action.payload.answer,
      };
      
      // Salvează progresul automat
      saveProgress(state.currentQuestion, newAnswers, state.questions);
      
      return {
        ...state,
        answers: newAnswers,
      };
      
    case ACTION_TYPES.SET_RESULTS:
      return {
        ...state,
        results: action.payload,
        testCompleted: true,
      };
      
    case ACTION_TYPES.SET_WALLET_STATE:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          ...action.payload,
        },
      };
      
    case ACTION_TYPES.RESET_TEST:
      // Șterge progresul salvat
      localStorage.removeItem(LOCAL_STORAGE_KEYS.testProgress);
      
      return {
        ...state,
        questions: [],
        currentQuestion: 0,
        answers: {},
        results: null,
        testCompleted: false,
      };
      
    case ACTION_TYPES.LOAD_PROGRESS:
      return {
        ...state,
        ...action.payload,
      };
      
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
      
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Efecte pentru încărcarea inițială
  useEffect(() => {
    initializeApp();
  }, []);
  
  // Funcție pentru inițializarea aplicației
  const initializeApp = async () => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { type: 'app', value: true } });
      
      // Încearcă să încarce progresul salvat
      const savedProgress = loadProgress();
      if (savedProgress) {
        dispatch({
          type: ACTION_TYPES.LOAD_PROGRESS,
          payload: {
            questions: savedProgress.questions,
            currentQuestion: savedProgress.currentQuestion,
            answers: savedProgress.answers,
          },
        });
      }
      
      // Încarcă preferințele utilizatorului
      loadUserPreferences();
      
    } catch (error) {
      console.error('Eroare la inițializarea aplicației:', error);
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        payload: 'Eroare la încărcarea aplicației. Te rugăm să reîncarci pagina.',
      });
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { type: 'app', value: false } });
    }
  };
  
  // Funcții pentru gestionarea testului
  const startTest = async () => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { type: 'test', value: true } });
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
      
      // Simulăm o mică întârziere pentru a evita racing conditions
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const questions = generateQuestionSet();
      dispatch({ type: ACTION_TYPES.SET_QUESTIONS, payload: questions });
      
      return true;
    } catch (error) {
      console.error('Eroare la generarea întrebărilor:', error);
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        payload: 'Eroare la începerea testului. Te rugăm să încerci din nou.',
      });
      throw error;
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { type: 'test', value: false } });
    }
  };
  
  const answerQuestion = (questionId, answerValue) => {
    try {
      const answer = {
        value: answerValue,
        timestamp: Date.now(),
      };
      
      dispatch({
        type: ACTION_TYPES.SET_ANSWER,
        payload: { questionId, answer },
      });
      
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
    } catch (error) {
      console.error('Eroare la salvarea răspunsului:', error);
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        payload: 'Eroare la salvarea răspunsului. Te rugăm să încerci din nou.',
      });
    }
  };
  
  const goToQuestion = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < state.questions.length) {
      dispatch({ type: ACTION_TYPES.SET_CURRENT_QUESTION, payload: questionIndex });
    }
  };
  
  const nextQuestion = () => {
    if (state.currentQuestion < state.questions.length - 1) {
      dispatch({
        type: ACTION_TYPES.SET_CURRENT_QUESTION,
        payload: state.currentQuestion + 1,
      });
    }
  };
  
  const previousQuestion = () => {
    if (state.currentQuestion > 0) {
      dispatch({
        type: ACTION_TYPES.SET_CURRENT_QUESTION,
        payload: state.currentQuestion - 1,
      });
    }
  };
  
  const resetTest = () => {
    dispatch({ type: ACTION_TYPES.RESET_TEST });
  };
  
  const setResults = (results) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_RESULTS, payload: results });
      
      // Salvează rezultatele în localStorage
      localStorage.setItem(LOCAL_STORAGE_KEYS.lastResult, JSON.stringify(results));
      
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
    } catch (error) {
      console.error('Eroare la salvarea rezultatelor:', error);
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        payload: 'Eroare la salvarea rezultatelor.',
      });
    }
  };
  
  // Funcții pentru gestionarea wallet-ului
  const updateWalletState = (walletData) => {
    dispatch({ type: ACTION_TYPES.SET_WALLET_STATE, payload: walletData });
  };
  
  // Funcții pentru gestionarea loading state-ului
  const setLoading = (type, value) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { type, value } });
  };
  
  // Funcții pentru gestionarea erorilor
  const setError = (error) => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
  };
  
  const clearError = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  };
  
  // Funcție pentru încărcarea preferințelor utilizatorului
  const loadUserPreferences = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.userPreferences);
      if (saved) {
        const preferences = JSON.parse(saved);
        // Aplicăm preferințele încărcate (theme, language, etc.)
        // Pentru moment nu avem multe preferințe, dar structura e pregătită
      }
    } catch (error) {
      console.error('Eroare la încărcarea preferințelor:', error);
    }
  };
  
  // Funcție pentru salvarea preferințelor utilizatorului
  const saveUserPreferences = (preferences) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.userPreferences, JSON.stringify(preferences));
    } catch (error) {
      console.error('Eroare la salvarea preferințelor:', error);
    }
  };
  
  // Calcularea progresului testului
  const getTestProgress = () => {
    if (state.questions.length === 0) return 0;
    
    const answeredCount = Object.keys(state.answers).length;
    return Math.round((answeredCount / state.questions.length) * 100);
  };
  
  // Verifică dacă utilizatorul poate continua la următoarea întrebare
  const canProceedToNext = () => {
    const currentQ = state.questions[state.currentQuestion];
    return currentQ && state.answers[currentQ.id];
  };
  
  // Verifică dacă testul poate fi finalizat
  const canCompleteTest = () => {
    return state.questions.length > 0 && 
           Object.keys(state.answers).length === state.questions.length;
  };
  
  // Valoarea contextului
  const contextValue = {
    // Starea
    ...state,
    
    // Funcții pentru test
    startTest,
    answerQuestion,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    resetTest,
    setResults,
    
    // Funcții pentru wallet
    updateWalletState,
    
    // Funcții pentru UI
    setLoading,
    setError,
    clearError,
    
    // Funcții pentru preferințe
    saveUserPreferences,
    
    // Helpers
    getTestProgress,
    canProceedToNext,
    canCompleteTest,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Hook pentru utilizarea contextului
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp trebuie utilizat în interiorul unui AppProvider');
  }
  return context;
}

export default AppContext; 