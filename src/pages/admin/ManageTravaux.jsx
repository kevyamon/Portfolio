// src/pages/admin/ManageTravaux.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';

import './Travaux.css'; // Notre CSS pour la grille
import '../../components/admin/AdminForms.css'; // Notre CSS pour les formulaires

import ProjectForm from '../../components/admin/ProjectForm';
import ConfirmationModal from '../../components/ConfirmationModal';
import LoadingSpinner from '../../components/admin/LoadingSpinner';

// Icônes pour les boutons
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

function ManageTravaux() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // États de gestion
  const [showForm, setShowForm] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // 1. Charger les projets au démarrage
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await apiClient.get('/api/projects');
      setProjects(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des projets.');
    }
    setIsLoading(false);
  };

  // 2. Logique d'ouverture des formulaires
  const openCreateForm = () => {
    setItemToEdit(null);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setItemToEdit(item);
    setShowForm(true);
  };

  // 3. Logique de soumission (appelée par ProjectForm)
  const handleFormSubmit = (updatedItem, mode) => {
    if (mode === 'create') {
      setProjects(prev => [updatedItem, ...prev]); // Ajoute le nouveau au début
    } else {
      setProjects(prev => 
        prev.map(item => (item._id === updatedItem._id ? updatedItem : item))
      );
    }
    setShowForm(false);
  };
  
  // 4. Logique de suppression
  const openDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      // Le backend s'occupe de supprimer de Cloudinary ET de MongoDB
      await apiClient.delete(`/api/projects/${itemToDelete._id}`);
      setProjects(prev => prev.filter(item => item._id !== itemToDelete._id));
      toast.success('Projet supprimé !');
    } catch (error) {
      toast.error('Erreur lors de la suppression.');
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <>
      {/* --- MODAL DE FORMULAIRE (caché par défaut) --- */}
      {showForm && (
        <ProjectForm
          itemToEdit={itemToEdit}
          onFormSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    
      {/* --- MODAL DE SUPPRESSION (caché par défaut) --- */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer le projet"
        message={`Êtes-vous sûr de vouloir supprimer: "${itemToDelete?.title}" ? (Le média sera aussi détruit de Cloudinary)`}
      />

      {/* --- SECTION PRINCIPALE (LISTE) --- */}
      <div className="travaux-header">
        <h2>Gérer les Travaux</h2>
        <button className="btn btn-primary" onClick={openCreateForm}>
          Ajouter un projet
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="projects-grid">
          {projects.map(item => (
            <div key={item._id} className="project-card-admin">
              {/* Média (Image ou Vidéo) */}
              <div className="project-card-media">
                {item.mediaType === 'video' ? (
                  <video src={item.mediaUrl} controls />
                ) : (
                  <img src={item.mediaUrl} alt={item.title} />
                )}
              </div>
              
              {/* Infos */}
              <div className="project-card-info">
                <h4>{item.title}</h4>
                <p>{item.description.substring(0, 100)}...</p>
                <div className="project-card-actions">
                  <button className="edit" onClick={() => openEditForm(item)}>
                    <EditIcon /> Modifier
                  </button>
                  <button className="delete" onClick={() => openDeleteConfirmation(item)}>
                    <TrashIcon /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && projects.length === 0 && (
        <p>Aucun projet trouvé. Cliquez sur "Ajouter un projet" pour commencer.</p>
      )}
    </>
  );
}

export default ManageTravaux;