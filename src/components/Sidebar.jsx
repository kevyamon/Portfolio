//src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUI } from '../context/UIContext';
import './Sidebar.css';

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.4,
      staggerChildren: 0.1, 
      delayChildren: 0.1 
    }
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.05, 
      staggerDirection: -1 
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 80, rotate: 2 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotate: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -40, 
    transition: { duration: 0.3, ease: "easeInOut" } 
  }
};

function Sidebar() {
  const { closeSidebar } = useUI();

  return (
    <motion.div 
      className="sidebar-fullscreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.4 } }}
    >
      <div className="sidebar-close-massive" onClick={closeSidebar}>
        <span className="close-text">Fermer</span>
        <div className="close-icon">
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className="sidebar-content-wrapper">
        <motion.nav 
          className="sidebar-nav-cinematic"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ul>
            <motion.li variants={itemVariant}>
              <Link to="/#hero" onClick={closeSidebar}>Accueil</Link>
            </motion.li>
            <motion.li variants={itemVariant}>
              <Link to="/#parcours" onClick={closeSidebar}>Parcours</Link>
            </motion.li>
            <motion.li variants={itemVariant}>
              <Link to="/#travaux" onClick={closeSidebar}>Accomplissements</Link>
            </motion.li>
            <motion.li variants={itemVariant}>
              <Link to="/#contact" onClick={closeSidebar}>Contact</Link>
            </motion.li>
          </ul>
        </motion.nav>
      </div>
    </motion.div>
  );
}

export default Sidebar;