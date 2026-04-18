//src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext';
import { useUI } from '../context/UIContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { duration: 1, ease: "easeOut" } 
  }
};

const blobVariants = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 90, 0],
    transition: { duration: 20, repeat: Infinity, ease: "linear" }
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
  const titleLine3 = profile?.titleLine3 || "Etudiant en I.A.C. - Option Controle";
  const subtitle = profile?.subtitle || "Specialise en controle qualite, analyse sensorielle et securite alimentaire.";
  const imageUrl = profile?.imageUrl || "/src/assets/profile.jpg";

  return (
    <section className="home-page glass-theme">
      {/* Arriere-plan anime abstrait */}
      <div className="glass-background-container">
        <motion.div className="glass-blob blob-1" variants={blobVariants} animate="animate"></motion.div>
        <motion.div className="glass-blob blob-2" variants={blobVariants} animate="animate" style={{ animationDelay: '-10s' }}></motion.div>
      </div>

      <motion.div 
        className="home-content-glass"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="glass-card" variants={itemVariants}>
          <div className="home-col-text">
            <motion.div className="welcome-badge-premium" variants={itemVariants}>
              <span className="pulse-dot-premium"></span> Bienvenue
            </motion.div>
            
            <motion.h1 className="home-title-premium" variants={itemVariants}>
              <span className="line">{titleLine1}</span>
              <span className="line highlight-premium">{titleLine2}</span>
              <span className="line line-job-premium">{titleLine3}</span>
            </motion.h1>
            
            <motion.p className="home-subtitle-premium" variants={itemVariants}>
              {subtitle}
            </motion.p>
            
            <motion.div variants={itemVariants} className="cta-container">
              <button 
                className="cta-button-premium" 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openSidebar}
              >
                <span>Decouvrir mon univers</span>
                <span className="cta-arrow-premium">&#8594;</span>
              </button>
            </motion.div>
          </div>

          <motion.div className="home-col-image-premium" variants={imageVariants}>
            <div className="image-wrapper-premium">
              <div className="image-glow"></div>
              <img src={imageUrl} alt="Kevy Amon" className="profile-img-premium" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <MenuHint />
    </section>
  );
}

export default Home;