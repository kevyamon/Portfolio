//src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext';
import { useUI } from '../context/UIContext';

// --- Animations Framer Motion ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

function Home() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();
  const { openSidebar } = useUI(); // Remplacement du querySelector

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
      socket.on('profile_updated', () => {
        console.log("Profil mis a jour via Socket !");
        fetchProfile();
      });
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
        className="home-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="home-image" variants={imageVariants}>
          <img src={imageUrl} alt="Profil Kevy" className="profile-img" />
        </motion.div>
        
        <div className="home-text">
          <motion.h1 className="home-title" variants={itemVariants}>
            <span className="line">{titleLine1}</span>
            <span className="line highlight">{titleLine2}</span>
            <span className="line">{titleLine3}</span>
          </motion.h1>
          
          <motion.p className="home-subtitle" variants={itemVariants}>
            {subtitle}
          </motion.p>
          
          <motion.button 
            className="cta-button" 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openSidebar}
          >
            Decouvrir mon univers
          </motion.button>
        </div>
      </motion.div>
      <MenuHint />
    </section>
  );
}

export default Home;