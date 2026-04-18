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
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
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
    <section className="home-page">
      <motion.div 
        className="home-content-linear"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="home-image-wrapper" variants={imageVariants}>
          <img src={imageUrl} alt="Kevy Amon" className="profile-img-linear" />
        </motion.div>
        
        <div className="home-text-center">
          <motion.div className="welcome-badge-linear" variants={itemVariants}>
            Bienvenue
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
              whileHover={{ scale: 1.05 }}
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