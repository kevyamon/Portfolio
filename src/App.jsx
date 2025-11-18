// kevyamon/portfolio/src/App.jsx
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ScrollToTopButton from './components/ScrollToTopButton';
import PageTransition from './components/PageTransition';
import { Toaster } from 'react-hot-toast';
import { useLongPress } from './hooks/useLongPress';
import LoginModal from './components/LoginModal';

// Import de l'image pour être sûr du chemin
import backgroundImage from './assets/background.png';

// --- Importer les composants Admin ---
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation(); 

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const longPressCallback = () => {
    setIsLoginModalOpen(true);
  };
  const { longPressEvents } = useLongPress(longPressCallback, 10000); 

  return (
    <div className="app-container">
      
      {/* --- LE FOND D'ÉCRAN FIXE (LA CORRECTION) --- */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0, // Utiliser bottom:0 est mieux que height:100vh sur mobile
          zIndex: -1,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none' // Pour pouvoir cliquer au travers
        }}
      />

      <Toaster position="top-center" reverseOrder={false} />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      <Header onToggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      <AnimatePresence>
        {isSidebarOpen && <Sidebar onClose={closeSidebar} />}
      </AnimatePresence>
      <ScrollToTopButton longPressEvents={longPressEvents} />

      <Routes location={location} key={location.pathname}>
        
        {/* --- Routes du Dashboard Admin --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<ManageProfile />} />
            <Route path="parcours" element={<ManageParcours />} />
            <Route path="travaux" element={<ManageTravaux />} />
            <Route path="messages" element={<ManageMessages />} />
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

      </Routes>
    </div>
  );
}

export default App;