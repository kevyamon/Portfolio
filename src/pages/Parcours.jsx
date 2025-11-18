import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext'; // Import du hook

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function Parcours() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Récupérer l'instance du socket
  const socket = useSocket();

  // Fonction de chargement (sortie du useEffect pour être réutilisée)
  const fetchParcours = useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const { data } = await apiClient.get('/api/timeline');
      setItems(data);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur de chargement.");
    } finally {
      if (showLoader) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParcours(true); // Premier chargement

    // 2. Écouter l'événement temps réel
    if (socket) {
      socket.on('timeline_updated', () => {
        console.log("⚡ Mise à jour reçue via Socket !");
        fetchParcours(false); // Recharger sans le spinner de chargement global
      });
    }

    // Nettoyage de l'écouteur
    return () => {
      if (socket) socket.off('timeline_updated');
    };
  }, [socket, fetchParcours]);

  const getIconPath = (iconName) => `/src/assets/icons/${iconName}.svg`;

  return (
    <section className="parcours-page page-container">
      <motion.h2 className="section-title" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        Mon Parcours
      </motion.h2>

      {isLoading ? <LoadingSpinner /> : error ? <p style={{ textAlign: 'center', color: '#ff7b7b' }}>{error}</p> : (
        <motion.div className="timeline-vertical" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {items.length === 0 && <p style={{ textAlign: 'center', color: '#aaa' }}>Aucune étape.</p>}
          {items.map((item) => (
            <motion.div key={item._id} className="timeline-step" variants={itemVariants}>
              <div className="step-marker">
                <div className="step-icon"><img src={getIconPath(item.icon)} alt={item.icon} /></div>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <div className="step-card">
                  <span className="step-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <span className="step-location">{item.location}</span>
                  <p className="step-desc">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      <MenuHint />
    </section>
  );
}

export default Parcours;