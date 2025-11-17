// kevyamon/portfolio/Portfolio-e572a9177e0ae953ff4556e4fd832a1accac8d85/src/App.jsx
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ScrollToTopButton from './components/ScrollToTopButton';
import PageTransition from './components/PageTransition';
import PageWipe from './components/PageWipe';
import { Toaster } from 'react-hot-toast';
import { useLongPress } from './hooks/useLongPress';
import LoginModal from './components/LoginModal';

// --- Importer les nouveaux composants Admin ---
import ProtectedRoute from './components/ProtectedRoute'; // Le "garde du corps"
import AdminLayout from './components/AdminLayout'; // Le "squelette" du dashboard
import DashboardHome from './pages/admin/DashboardHome'; // L'accueil du dashboard

// Pages Publiques
import Home from './pages/Home';
import Parcours from './pages/Parcours';
import Travaux from './pages/Travaux';
import Contact from './pages/Contact';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const longPressCallback = () => {
    setIsLoginModalOpen(true);
  };
  const { longPressEvents } = useLongPress(longPressCallback, 10000); 

  return (
    <div className="app-container">
      <Toaster position="top-center" reverseOrder={false} />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      {/* Le Header et la Sidebar ne doivent s'afficher QUE sur le site public,
        PAS dans le dashboard. Nous allons gérer ça plus tard.
        Pour l'instant, on se concentre sur les routes.
      */}
      <Header onToggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      <AnimatePresence>
        {isSidebarOpen && <Sidebar onClose={closeSidebar} />}
      </AnimatePresence>
      <ScrollToTopButton longPressEvents={longPressEvents} />

      {/* On retire AnimatePresence d'ici pour l'appliquer 
        séparément au site public et au dashboard.
      */}
      <Routes location={location} key={location.pathname}>
        
        {/* --- Routes du Dashboard Admin --- */}
        {/* 'element' est notre "garde du corps" */}
        <Route element={<ProtectedRoute />}>
          {/* Si le garde dit OK, il affiche le "squelette" */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Et le "squelette" affiche ces pages à l'intérieur : */}
            <Route index element={<DashboardHome />} />
            {/* (Nous ajouterons les autres pages admin ici plus tard) */}
          </Route>
        </Route>

        {/* --- Routes Publiques (Site Principal) --- */}
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
        
        {/* Note: Le PageWipe ne fonctionnera plus car nous avons retiré 
            AnimatePresence. Nous corrigerons cela plus tard.
            L'objectif principal est de créer la route admin.
        */}

      </Routes>
    </div>
  );
}

export default App;