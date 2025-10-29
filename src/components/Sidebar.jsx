import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Sidebar.css';

// --- Définitions des animations ---

// 1. L'animation de la "vague" (le fond noir)
const waveVariant = {
  // Départ : un cercle de 0px en haut à droite
  initial: {
    clipPath: 'circle(0px at calc(100% - 35px) 32px)',
  },
  // Arrivée : un cercle assez grand pour couvrir tout l'écran
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

// 2. L'animation du conteneur des liens (pour le décalage)
const listContainerVariant = {
  animate: {
    transition: {
      // Les enfants (liens) s'animeront les uns après les autres
      staggerChildren: 0.1,
      delayChildren: 0.3 // Attend que la vague soit un peu ouverte
    }
  }
};

// 3. L'animation de chaque lien (fondu + montée)
const listItemVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      ease: 'easeOut'
    }
  }
};

// --- Le composant ---

function Sidebar({ onClose }) {
  return (
    <motion.aside 
      className="sidebar-wave"
      variants={waveVariant}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Le bouton "X" de fermeture (style de la vidéo) */}
      <div className="sidebar-close-x" onClick={onClose}>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <motion.nav 
        className="sidebar-nav-wave"
        variants={listContainerVariant}
        initial="initial"
        animate="animate"
      >
        <ul>
          <motion.li variants={listItemVariant}><Link to="/" onClick={onClose}>Accueil</Link></motion.li>
          <motion.li variants={listItemVariant}><Link to="/parcours" onClick={onClose}>Parcours</Link></motion.li>
          <motion.li variants={listItemVariant}><Link to="/travaux" onClick={onClose}>Travaux Pratiques</Link></motion.li>
          <motion.li variants={listItemVariant}><Link to="/contact" onClick={onClose}>Contact</Link></motion.li>
        </ul>
      </motion.nav>
    </motion.aside>
  );
}

export default Sidebar;
