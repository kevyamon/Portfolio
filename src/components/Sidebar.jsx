import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Sidebar.css';

// --- Définitions des animations ---

// 1. Animation de la VAGUE (réintroduite)
const waveVariant = {
  // Départ : un cercle de 0px en haut à droite DU PANNEAU
  initial: {
    clipPath: 'circle(0px at calc(100% - 35px) 32px)',
  },
  // Arrivée : un cercle assez grand pour couvrir LE PANNEAU
  animate: {
    clipPath: 'circle(150vh at calc(100% - 35px) 32px)',
    transition: {
      duration: 0.7,
      ease: 'easeIn'
    }
  },
  // Sortie : le cercle se referme
  exit: {
    clipPath: 'circle(0px at calc(100% - 35px) 32px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// 2. Animation de l'overlay (fondu)
const overlayVariant = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

// 3. Animation du conteneur des liens
const listContainerVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3 // Délai pour laisser la vague s'ouvrir
    }
  },
  exit: { opacity: 0 }
};

// 4. Animation de chaque lien
const listItemVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { ease: 'easeOut' }
  }
};

// --- Le composant ---

function Sidebar({ onClose }) {
  return (
    <>
      {/* L'overlay (assombrit la page) */}
      <motion.div
        className="sidebar-overlay"
        variants={overlayVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      ></motion.div>

      {/* Le menu latéral partiel QUI UTILISE LA VAGUE */}
      <motion.aside 
        className="sidebar-partial" // La classe qui le rend partiel
        variants={waveVariant} // L'animation qui le dessine
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Le bouton "X" */}
        <div className="sidebar-close-x" onClick={onClose}>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* La navigation */}
        <motion.nav 
          className="sidebar-nav-wave"
          variants={listContainerVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ul>
            <motion.li variants={listItemVariant}><Link to="/" onClick={onClose}>Accueil</Link></motion.li>
            <motion.li variants={listItemVariant}><Link to="/parcours" onClick={onClose}>Parcours</Link></motion.li>
            <motion.li variants={listItemVariant}><Link to="/travaux" onClick={onClose}>Travaux Pratiques</Link></motion.li>
            <motion.li variants={listItemVariant}><Link to="/contact" onClick={onClose}>Contact</Link></motion.li>
          </ul>
        </motion.nav>
      </motion.aside>
    </>
  );
}

export default Sidebar;