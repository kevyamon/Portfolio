//kevyamon/portfolio/src/components/ContentModal.jsx
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ContentModal.css';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2, ease: 'easeIn' } }
};

function ContentModal({ isOpen, onClose, title, subtitle, content, children }) {
  const scrollRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Verrouiller le scroll de la page principale quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleScroll = () => {
    if (scrollRef.current) {
      // Afficher le bouton si on a defile de plus de 100px vers le bas
      setShowScrollTop(scrollRef.current.scrollTop > 100);
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div 
          className="modal-box"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()} // Empeche la fermeture si on clique a l'interieur
        >
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
          
          <div className="modal-header">
            {subtitle && <span className="modal-subtitle">{subtitle}</span>}
            <h3 className="modal-title">{title}</h3>
          </div>

          <div 
            className="modal-body-scroll" 
            ref={scrollRef} 
            onScroll={handleScroll}
          >
            {/* Contenu textuel standard */}
            {content && <p className="modal-text-content">{content}</p>}
            
            {/* Espace pour injecter d'autres choses (comme des photos/videos plus tard) */}
            {children}
          </div>

          {/* Bouton Scroll To Top Interne */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button 
                className="modal-scroll-top-btn"
                onClick={scrollToTop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                &#8593;
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ContentModal;