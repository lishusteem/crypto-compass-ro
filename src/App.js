import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import CSS global
import './styles/globals.css';

// Import components
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import IntroSection from './components/Intro/IntroSection.jsx';
import TestSection from './components/Test/TestSection.jsx';
import ResultsSection from './components/Results/ResultsSection.jsx';
import TechBackground from './components/Shared/TechBackground.jsx';
import FloatingParticles from './components/Shared/FloatingParticles.jsx';
import NetworkEffect from './components/Shared/NetworkEffect.jsx';

// Import providers și contexte
import { AppProvider } from './contexts/AppContext.jsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-primary-bg text-primary-text-primary relative">
          {/* Tech Background Animations */}
          <TechBackground />
          <FloatingParticles />
          <NetworkEffect />
          
          {/* Header persistent */}
          <Header />
          
          {/* Main content */}
          <main className="pt-10"> {/* Offset pentru header fix */}
            <Routes>
              <Route path="/" element={<IntroSection />} />
              <Route path="/test" element={<TestSection />} />
              <Route path="/results" element={<ResultsSection />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#f8fafc',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#f8fafc',
                },
              },
            }}
          />
    </div>
      </Router>
    </AppProvider>
  );
}

export default App;
