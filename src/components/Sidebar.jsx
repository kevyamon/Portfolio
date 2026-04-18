//src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUI } from '../context/UIContext';
import './Sidebar.css';

// --- Animations Acceleres ---

const waveVariant = {
  initial: {
    clipPath: 'circle(0px at calc(100% - 35px) 32px)',
  },
  animate: {
    clipPath: 'circle(150vh at calc(100% - 35px) 32px)',
    transition: {
      duration: 0.4, // Reduit pour supprimer la latence
      ease: 'easeIn'
    }
  },
  exit: {
    clipPath: 'circle(0px at calc(100% - 35px) 32px)',
    transition: {
      duration: 0.3, // Fermeture plus vive
      ease: 'easeOut'
    }
  }
};

const overlayVariant = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

const listContainerVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Affichage en cascade plus rapide
      delayChildren: 0.15 
    }
  },
  exit: { opacity: 0 }
};

const listItemVariant = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { ease: 'easeOut', duration: 0.2 }
  }
};

function Sidebar() {
  const { closeSidebar } = useUI();

  return (
    <>
      <motion.div
        className="sidebar-overlay"
        variants={overlayVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={closeSidebar}
      ></motion.div>

      <motion.aside 
        className="sidebar-partial"
        variants={waveVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="sidebar-close-x" onClick={closeSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <motion.nav 
          className="sidebar-nav-wave"
          variants={listContainerVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ul>
            <motion.li variants={listItemVariant}><Link to="/" onClick={closeSidebar}>Accueil</Link></motion.li>
            <motion.li variants={listItemVariant}><Link to="/parcours" onClick={closeSidebar}>Parcours</Link></motion.li>
            <motion.li variants={listItemVariant}><Link to="/travaux" onClick={closeSidebar}>Travaux Pratiques</Link></motion.li>
            <motion.li variants={listItemVariant}><Link to="/contact" onClick={closeSidebar}>Contact</Link></motion.li>
          </ul>
        </motion.nav>
      </motion.aside>
    </>
  );
}

export default Sidebar;