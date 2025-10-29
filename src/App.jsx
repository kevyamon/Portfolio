import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ScrollToTopButton from './components/ScrollToTopButton';
import PageTransition from './components/PageTransition';
import PageWipe from './components/PageWipe';

// Pages
import Home from './pages/Home';
import Parcours from './pages/Parcours';
import Travaux from './pages/Travaux';
import Contact from './pages/Contact';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-container">
      {/* J'informe le Header de l'état "ouvert" pour qu'il puisse se cacher */}
      <Header onToggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      
      {/* La Sidebar est maintenant gérée par AnimatePresence ici 
          pour qu'elle puisse s'animer à l'entrée et à la sortie.
      */}
      <AnimatePresence>
        {isSidebarOpen && <Sidebar onClose={closeSidebar} />}
      </AnimatePresence>

      <AnimatePresence>
        <PageWipe key={location.pathname + '-wipe'} />
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            } 
          />
          <Route 
            path="/parcours" 
            element={
              <PageTransition>
                <Parcours />
              </PageTransition>
            } 
          />
          <Route 
            path="/travaux" 
            element={
              <PageTransition>
                <Travaux />
              </PageTransition>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            } 
          />
        </Routes>
      </AnimatePresence>

      <ScrollToTopButton />
    </div>
  );
}

export default App;
