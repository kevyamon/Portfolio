//src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext';
import { useUI } from '../context/UIContext';

// Importation des sections existantes pour le mode de défilement linéaire (single page)
import Parcours from './Parcours';
import Travaux from './Travaux';
import Contact from './Contact';

// --- Icône Compas (Dessin Technique / Architecture) ---
const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="compass-icon">
    <path d="m9.88 9.88-2.61 9.4c-.16.58.4 1.14.98.98l9.4-2.61a.5.5 0 0 0 .28-.28l2.61-9.4c.16-.58-.4-1.14-.98-.98l-9.4 2.61a.5.5 0 0 0-.28.28z"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

// --- Icônes pour la Maîtrise Technique ---
const BlueprintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="9" y1="3" x2="9" y2="21"></line>
    <line x1="15" y1="3" x2="15" y2="21"></line>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="3" y1="15" x2="21" y2="15"></line>
  </svg>
);

const ChipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="15" x2="23" y2="15"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="15" x2="4" y2="15"></line>
  </svg>
);

const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
  </svg>
);

// --- Animations d'entrée pour Framer Motion ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
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

  // Remplacement dynamique du nom de l'image de profil pour éviter la casse
  let imageUrl = profile?.imageUrl || "/photo-profile.png";
  if (imageUrl === "/photo-profil.jpg") {
    imageUrl = "/photo-profile.png";
  }

  return (
    <div className="home-page-scroller">
      <div className="home-container">
        
        {/* ==========================================
            SECTION HERO
            ========================================== */}
        <motion.section 
          id="hero"
          className="hero-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="hero-info">
            <motion.div className="hero-badge" variants={itemVariants}>
              KEVIN AMON | KEVY
            </motion.div>
            
            <motion.h1 className="hero-name" variants={itemVariants}>
              KEVIN<br />AMON
            </motion.h1>
            
            <motion.h2 className="hero-subtitle" variants={itemVariants}>
              AI Driven Software Architect | ADSA
            </motion.h2>
            
            <motion.div variants={itemVariants}>
              <button className="hero-cta" onClick={openSidebar}>
                EXPLORER MON PORTFOLIO
              </button>
            </motion.div>
          </div>

          <motion.div 
            className="hero-photo-frame"
            variants={itemVariants}
          >
            <div className="frame-corner corner-tl"></div>
            <div className="frame-corner corner-tr"></div>
            <div className="frame-corner corner-bl"></div>
            <div className="frame-corner corner-br"></div>
            
            <img src={imageUrl} alt="Kevin Amon" className="profile-picture" />
            
            <div className="frame-annotation">ORD #1 | SECTION A</div>
          </motion.div>
        </motion.section>

        {/* ==========================================
            SECTION : QUI JE SUIS | L'ARCHITECTE
            ========================================== */}
        <motion.section 
          className="home-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-label">01 // PREFACE</span>
          <h2 className="home-section-title">Qui je suis | L'Architecte</h2>
          
          <div className="about-grid">
            <div className="about-visual">
              <CompassIcon />
            </div>
            
            <div className="about-text">
              <p className="about-p-highlight">
                Jo Lois Kevis, connu sous le nom de Kevy. Architecte de Solutions Digitales (ADSA) et Pilote Fullstack.
              </p>
              <p className="about-p-body">
                Je comble le déficit des écosystèmes web, intelligents et précis, alliant rigueur scientifique et esthétique de produits tout en maîtrisant le cycle de développement complet. Je conçois et déploie des infrastructures web hautement évolutives, adaptées aux réalités de demain.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ==========================================
            SECTION : MAÎTRISE TECHNIQUE
            ========================================== */}
        <motion.section 
          className="home-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-label">02 // CAPABILITES</span>
          <h2 className="home-section-title">Maîtrise Technique | Ce que je sais faire</h2>
          
          <div className="skills-grid">
            
            {/* Carte 1 : Architecture */}
            <motion.div className="skill-card-inverted" variants={itemVariants}>
              <div className="skill-card-header">
                <div className="skill-icon-wrapper">
                  <BlueprintIcon />
                </div>
                <h3 className="skill-card-title">Architecture CSCSM</h3>
              </div>
              <ul className="skill-items-list">
                <li className="skill-item">Conception système</li>
                <li className="skill-item">Modélisation de données</li>
                <li className="skill-item">Modularité structure</li>
              </ul>
            </motion.div>

            {/* Carte 2 : IA */}
            <motion.div className="skill-card-inverted" variants={itemVariants}>
              <div className="skill-card-header">
                <div className="skill-icon-wrapper">
                  <ChipIcon />
                </div>
                <h3 className="skill-card-title">Pilotage IA</h3>
              </div>
              <ul className="skill-items-list">
                <li className="skill-item">Prompting avancé</li>
                <li className="skill-item">Agents intelligents (IA)</li>
                <li className="skill-item">Intégration IA Stack MERN</li>
              </ul>
            </motion.div>

            {/* Carte 3 : Fullstack */}
            <motion.div className="skill-card-inverted" variants={itemVariants}>
              <div className="skill-card-header">
                <div className="skill-icon-wrapper">
                  <DatabaseIcon />
                </div>
                <h3 className="skill-card-title">Stack Fullstack</h3>
              </div>
              <ul className="skill-items-list">
                <li className="skill-item">React / Next.js</li>
                <li className="skill-item">Node.js / Express</li>
                <li className="skill-item">MongoDB / PostgreSQL</li>
                <li className="skill-item">Déploiement Vercel / Render</li>
              </ul>
            </motion.div>

          </div>
        </motion.section>

        {/* ==========================================
            SECTION : MA VISION
            ========================================== */}
        <motion.section 
          className="home-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-label">03 // PERSPECTIVE</span>
          <h2 className="home-section-title">Ma Vision | Le Futur du Web</h2>
          
          <div className="vision-grid">
            <div className="vision-visual-wrapper">
              {/* Utilisation de l'image de profil pour représenter l'alliance Humain/IA */}
              <img src={imageUrl} alt="Humain et IA" className="vision-image" />
            </div>
            
            <div className="vision-text">
              <p>
                Je conçois des applications intelligentes, fluides et performantes, prêtes pour le futur du web. Je fusionne l'intelligence artificielle et l'architecture logicielle moderne pour concevoir des expériences utilisateur d'exception, alliant rapidité d'exécution et modularité.
              </p>
            </div>
          </div>
        </motion.section>

      </div>

      {/* ==========================================================================
          INTEGRATION DES SECTIONS EXISTANTES SOUS FORME DE BLOCS DE SCROLL
          ========================================================================== */}
      <div id="parcours" className="scroll-section-wrapper">
        <Parcours />
      </div>

      <div id="travaux" className="scroll-section-wrapper">
        <Travaux />
      </div>

      <div id="contact" className="scroll-section-wrapper">
        <Contact />
      </div>

      <MenuHint />
    </div>
  );
}

export default Home;