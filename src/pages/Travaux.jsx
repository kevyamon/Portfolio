//src/pages/Travaux.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext';
import ContentModal from '../components/ContentModal';

function Travaux() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Etat pour la modale
  const [selectedProject, setSelectedProject] = useState(null);
  
  const socket = useSocket();

  const fetchProjects = useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const { data } = await apiClient.get('/api/projects');
      setProjects(data);
    } catch (err) {
      console.error("Erreur chargement accomplissements:", err);
      setError("Impossible de charger les accomplissements.");
    } finally {
      if (showLoader) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects(true);

    if (socket) {
      socket.on('projects_updated', () => {
        console.log("Accomplissements mis a jour via Socket");
        fetchProjects(false);
      });
    }

    return () => {
      if (socket) socket.off('projects_updated');
    };
  }, [socket, fetchProjects]);

  const TEXT_LIMIT = 100;

  return (
    <section className="travaux-page page-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mes Accomplissements
      </motion.h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'var(--color-error)' }}>{error}</p>
      ) : (
        <div className="container">
          {projects.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-textMuted)' }}>Aucun accomplissement publie pour le moment.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {projects.map((project) => {
                const isTextLong = project.description && project.description.length > TEXT_LIMIT;
                const displayText = isTextLong 
                  ? project.description.substring(0, TEXT_LIMIT) + '...' 
                  : project.description;

                return (
                  <motion.div 
                    key={project._id}
                    className="step-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Zone Media */}
                    <div style={{ width: '100%', height: '200px', background: 'var(--color-background)', borderRadius: '8px', overflow: 'hidden', marginBottom: '15px' }}>
                      {project.mediaType === 'video' ? (
                        <video src={project.mediaUrl} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img src={project.mediaUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>

                    <h3 style={{ marginBottom: '10px', fontSize: '1.3rem', color: 'var(--color-text)' }}>{project.title}</h3>
                    
                    <p style={{ color: 'var(--color-textMuted)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>
                      {displayText}
                    </p>
                    
                    {isTextLong && (
                      <button 
                        className="read-more-link" 
                        onClick={() => setSelectedProject(project)}
                        style={{ display: 'block', marginBottom: '15px' }}
                      >
                        Lire la suite
                      </button>
                    )}
                    
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginTop: '10px' }}
                      >
                        Voir la ressource source
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <MenuHint />

      {/* Rendu conditionnel de la Modale */}
      <ContentModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        content={selectedProject?.description}
      >
        {/* On injecte le media complet dans la modale via la propriete children */}
        {selectedProject && (
          <div style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden', background: 'var(--color-background)' }}>
             {selectedProject.mediaType === 'video' ? (
                <video src={selectedProject.mediaUrl} controls style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
              ) : (
                <img src={selectedProject.mediaUrl} alt={selectedProject.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
              )}
          </div>
        )}
      </ContentModal>
    </section>
  );
}

export default Travaux;