//src/components/ContentModal.jsx
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

  // Blocage strict du scroll en arriere-plan
  useEffect(() => {
    if (isOpen) {
      // On bloque le body ET le html pour etre certain de couvrir tous les navigateurs
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    // Nettoyage lors du demontage du composant
    return () => { 
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowScrollTop(scrollRef.current.scrollTop > 100);
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // On enveloppe tout dans AnimatePresence et on conditionne l'affichage a l'interieur
  // Cela permet a Framer Motion de jouer l'animation de sortie (exit) avant de retirer l'element du DOM
  return (
    <AnimatePresence>
      {isOpen && (
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
            onClick={(e) => e.stopPropagation()} 
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
              {content && <p className="modal-text-content">{content}</p>}
              {children}
            </div>

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
      )}
    </AnimatePresence>
  );
}

export default ContentModal;