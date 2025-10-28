import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ScrollToTopButton from './components/ScrollToTopButton';

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
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'relative', width: '100%' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/parcours" element={<Parcours />} />
            <Route path="/travaux" element={<Travaux />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <ScrollToTopButton />
      {/* SUPPRIMÉ : <MenuHint /> */}
    </div>
  );
}

export default App;