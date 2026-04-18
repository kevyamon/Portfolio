//kevyamon/portfolio/src/pages/Parcours.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext';
import { getIconComponent } from '../utils/iconLibrary';
import ContentModal from '../components/ContentModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function Parcours() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Etat pour la modale
  const [selectedItem, setSelectedItem] = useState(null);
  
  const socket = useSocket();

  const fetchParcours = useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const { data } = await apiClient.get('/api/timeline');
      setItems(data);
    } catch (err) {
      console.error("Erreur chargement parcours:", err);
      setError("Erreur de chargement.");
    } finally {
      if (showLoader) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParcours(true);
    if (socket) {
      socket.on('timeline_updated', () => {
        fetchParcours(false);
      });
    }
    return () => {
      if (socket) socket.off('timeline_updated');
    };
  }, [socket, fetchParcours]);

  const TEXT_LIMIT = 120; // Limite de caracteres avant troncature

  return (
    <section className="parcours-page page-container">
      <motion.h2 
        className="section-title" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        Mon Parcours
      </motion.h2>

      {isLoading ? <LoadingSpinner /> : error ? <p style={{ color: 'var(--color-error)' }}>{error}</p> : (
        <motion.div 
          className="timeline-vertical" 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.length === 0 && <p style={{ color: 'var(--color-textMuted)' }}>Aucune etape.</p>}
          
          {items.map((item) => {
            const IconComponent = getIconComponent(item.icon);
            const isTextLong = item.description && item.description.length > TEXT_LIMIT;
            const displayText = isTextLong 
              ? item.description.substring(0, TEXT_LIMIT) + '...' 
              : item.description;

            return (
              <motion.div key={item._id} className="timeline-step" variants={itemVariants}>
                <div className="step-marker">
                  <div className="step-icon">
                    <IconComponent />
                  </div>
                  <div className="step-line"></div>
                </div>
                <div className="step-content">
                  <div className="step-card">
                    <span className="step-year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <span className="step-location">{item.location}</span>
                    <p className="step-desc">
                      {displayText}
                    </p>
                    {isTextLong && (
                      <button 
                        className="read-more-link" 
                        onClick={() => setSelectedItem(item)}
                      >
                        Cliquez pour voir plus
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
      <MenuHint />

      {/* Rendu conditionnel de la Modale */}
      <ContentModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title}
        subtitle={`${selectedItem?.year} - ${selectedItem?.location}`}
        content={selectedItem?.description}
      />
      
    </section>
  );
}

export default Parcours;