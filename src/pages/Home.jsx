//src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext';
import { useUI } from '../context/UIContext';

// --- Animations d'entree ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// --- Animations perpetuelles (Ambiance) ---
const floatAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
};

const ambientVariants1 = {
  animate: { 
    x: [0, 30, 0], 
    y: [0, 40, 0], 
    scale: [1, 1.1, 1],
    transition: { duration: 15, repeat: Infinity, ease: "easeInOut" } 
  }
};

const ambientVariants2 = {
  animate: { 
    x: [0, -40, 0], 
    y: [0, -20, 0], 
    scale: [1, 1.2, 1],
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 } 
  }
};

function Home() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();
  const { openSidebar } = useUI();

  const fetchProfile = async () => {
    try {
      const { data } = await apiClient.get('/api/profile');
      setProfile(data);
    } catch (error) {
      console.error("Erreur chargement profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    if (socket) {
      socket.on('profile_updated', fetchProfile);
    }
    return () => {
      if (socket) socket.off('profile_updated');
    };
  }, [socket]);

  if (isLoading) return <div className="home-page"><LoadingSpinner /></div>;

  const titleLine1 = profile?.titleLine1 || "Bonjour, je suis";
  const titleLine2 = profile?.titleLine2 || "Kevy";
  const titleLine3 = profile?.titleLine3 || "Étudiant en I.A.C. - Option Contrôle";
  const subtitle = profile?.subtitle || "Spécialisé en contrôle qualité, analyse sensorielle et sécurité alimentaire.";
  const imageUrl = profile?.imageUrl || "/src/assets/profile.jpg";

  return (
    <section className="home-page">
      {/* Arriere-plan organique */}
      <div className="ambient-background">
        <motion.div className="ambient-orb orb-1" variants={ambientVariants1} animate="animate" />
        <motion.div className="ambient-orb orb-2" variants={ambientVariants2} animate="animate" />
      </div>

      <motion.div 
        className="home-content-linear"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="home-image-wrapper" variants={imageVariants}>
          <motion.div animate={floatAnimation}>
            <img src={imageUrl} alt="Kevy Amon" className="profile-img-linear" />
          </motion.div>
        </motion.div>
        
        <div className="home-text-center">
          <motion.div className="welcome-badge-linear" variants={itemVariants}>
            <span className="dot-pulse"></span> Bienvenue
          </motion.div>

          <motion.h1 className="home-title-linear" variants={itemVariants}>
            <span className="line">{titleLine1}</span>
            <span className="line highlight-linear">{titleLine2}</span>
            <span className="line line-job-linear">{titleLine3}</span>
          </motion.h1>
          
          <motion.p className="home-subtitle-linear" variants={itemVariants}>
            {subtitle}
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <button 
              className="cta-button-linear" 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={openSidebar}
            >
              Decouvrir mon univers
              <span className="cta-arrow-linear">&#8594;</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
      <MenuHint />
    </section>
  );
}

export default Home;