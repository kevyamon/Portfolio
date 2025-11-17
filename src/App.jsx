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

// --- Importer les composants Admin ---
import ProtectedRoute from './components/ProtectedRoute'; 
import AdminLayout from './components/AdminLayout'; 
import DashboardHome from './pages/admin/DashboardHome'; 
// --- IMPORTER LES NOUVELLES PAGES ADMIN ---
import ManageParcours from './pages/admin/ManageParcours';
import ManageTravaux from './pages/admin/ManageTravaux';
import ManageMessages from './pages/admin/ManageMessages';

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

      {/* Note: Nous allons corriger l'affichage conditionnel du Header/Sidebar plus tard */}
      <Header onToggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      <AnimatePresence>
        {isSidebarOpen && <Sidebar onClose={closeSidebar} />}
      </AnimatePresence>
      <ScrollToTopButton longPressEvents={longPressEvents} />

      
      <Routes location={location} key={location.pathname}>
        
        {/* --- Routes du Dashboard Admin --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* CORRECTION : Déclaration des sous-routes */}
            <Route index element={<DashboardHome />} />
            <Route path="parcours" element={<ManageParcours />} />
            <Route path="travaux" element={<ManageTravaux />} />
            <Route path="messages" element={<ManageMessages />} />
          </Route>
        </Route>

        {/* --- Routes Publiques (Site Principal) --- */}
        {/* Note: Nous allons réintégrer AnimatePresence pour le site public bientôt */}
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
    </div>
  );
}

export default App;