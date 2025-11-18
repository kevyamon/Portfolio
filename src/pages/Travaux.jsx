import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext';

function Travaux() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const socket = useSocket();

  const fetchProjects = useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const { data } = await apiClient.get('/api/projects');
      setProjects(data);
    } catch (err) {
      console.error("Erreur chargement projets:", err);
      setError("Impossible de charger les travaux.");
    } finally {
      if (showLoader) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects(true);

    if (socket) {
      socket.on('projects_updated', () => {
        console.log("⚡ Projets mis à jour via Socket !");
        fetchProjects(false);
      });
    }

    return () => {
      if (socket) socket.off('projects_updated');
    };
  }, [socket, fetchProjects]);

  return (
    <section className="travaux-page page-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mes Travaux Pratiques
      </motion.h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p style={{ textAlign: 'center', color: '#ff7b7b' }}>{error}</p>
      ) : (
        <div className="container">
          {projects.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa' }}>Aucun projet publié pour le moment.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {projects.map((project) => (
                <motion.div 
                  key={project._id}
                  className="step-card" // Réutilisation du style des cartes
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Zone Média */}
                  <div style={{ width: '100%', height: '200px', background: '#000', borderRadius: '8px', overflow: 'hidden', marginBottom: '15px' }}>
                    {project.mediaType === 'video' ? (
                      <video src={project.mediaUrl} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={project.mediaUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>

                  <h3 style={{ marginBottom: '10px', fontSize: '1.3rem' }}>{project.title}</h3>
                  <p style={{ color: '#ccc', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>
                    {project.description}
                  </p>
                  
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}
                    >
                      Voir plus →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
      <MenuHint />
    </section>
  );
}

export default Travaux;