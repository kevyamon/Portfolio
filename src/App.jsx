import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import { Toaster } from 'react-hot-toast';
import { useLongPress } from './hooks/useLongPress';
import LoginModal from './components/LoginModal';
import { useUI } from './context/UIContext';

// Import du Loader de reveil serveur
import SandglassLoader from './components/SandglassLoader';

// Import de l'image pour etre sur du chemin
import backgroundImage from './assets/background.png';

// Importer les composants Admin
import ProtectedRoute from './components/ProtectedRoute'; 
import AdminLayout from './components/AdminLayout'; 
import DashboardHome from './pages/admin/DashboardHome'; 
import ManageParcours from './pages/admin/ManageParcours';
import ManageTravaux from './pages/admin/ManageTravaux';
import ManageMessages from './pages/admin/ManageMessages';
import ManageProfile from './pages/admin/ManageProfile';

// Pages Publiques
import Home from './pages/Home';
import Parcours from './pages/Parcours';
import Travaux from './pages/Travaux';
import Contact from './pages/Contact';

function App() {
  const { isSidebarOpen } = useUI();
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation(); 

  const longPressCallback = () => {
    setIsLoginModalOpen(true);
  };
  const { longPressEvents } = useLongPress(longPressCallback, 10000); 

  return (
    <div className="app-container">
      {/* LE FOND D'ECRAN FIXE - Toujours present pour la continuite visuelle */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0, 
          zIndex: -1,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none' 
        }}
      />

      <Toaster position="top-center" reverseOrder={false} />

      {/* GESTION DU LOADER INITIAL - OPTIMISÉ POUR LE SEO */}
      {/* Le loader s'affiche au-dessus tant que l'app n'est pas prête */}
      {!isAppReady && (
        <SandglassLoader onFinished={() => setIsAppReady(true)} />
      )}

      {/* Le contenu principal est toujours dans le DOM pour Googlebot, 
          mais caché visuellement à l'utilisateur jusqu'à la fin du chargement */}
      <div 
        style={{
          visibility: isAppReady ? 'visible' : 'hidden',
          opacity: isAppReady ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: isAppReady ? 'auto' : 'none',
          position: isAppReady ? 'relative' : 'absolute',
          width: '100%',
          height: isAppReady ? 'auto' : '0',
          overflow: isAppReady ? 'visible' : 'hidden'
        }}
      >
        <ScrollToTop />

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />

        <Header />
        <AnimatePresence>
          {isSidebarOpen && <Sidebar />}
        </AnimatePresence>
        
        <ScrollToTopButton longPressEvents={longPressEvents} />

        <Routes location={location} key={location.pathname}>
          {/* Routes du Dashboard Admin */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<ManageProfile />} />
              <Route path="parcours" element={<ManageParcours />} />
              <Route path="travaux" element={<ManageTravaux />} />
              <Route path="messages" element={<ManageMessages />} />
            </Route>
          </Route>

          {/* Routes Publiques (Site Principal) */}
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
    </div>
  );
}

export default App;