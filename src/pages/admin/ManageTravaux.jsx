//src/pages/admin/ManageTravaux.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';

import './Travaux.css'; 
import '../../components/admin/AdminForms.css'; 

import ProjectForm from '../../components/admin/ProjectForm';
import ConfirmationModal from '../../components/ConfirmationModal';
import LoadingSpinner from '../../components/admin/LoadingSpinner';

const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

function ManageTravaux() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await apiClient.get('/api/projects');
      setProjects(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des accomplissements.');
    }
    setIsLoading(false);
  };

  const openCreateForm = () => {
    setItemToEdit(null);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setItemToEdit(item);
    setShowForm(true);
  };

  const handleFormSubmit = (updatedItem, mode) => {
    if (mode === 'create') {
      setProjects(prev => [updatedItem, ...prev]); 
    } else {
      setProjects(prev => 
        prev.map(item => (item._id === updatedItem._id ? updatedItem : item))
      );
    }
    setShowForm(false);
  };
  
  const openDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await apiClient.delete(`/api/projects/${itemToDelete._id}`);
      setProjects(prev => prev.filter(item => item._id !== itemToDelete._id));
      toast.success('Accomplissement supprime avec succes.');
    } catch (error) {
      toast.error('Erreur lors de la suppression.');
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <>
      {showForm && (
        <ProjectForm
          itemToEdit={itemToEdit}
          onFormSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer l'accomplissement"
        message={`Etes-vous sur de vouloir supprimer: "${itemToDelete?.title}" ? (Le media sera detruit de Cloudinary)`}
      />

      <div className="travaux-header">
        <h2>Gerer les Accomplissements</h2>
        <button className="btn btn-primary" onClick={openCreateForm}>
          Ajouter un accomplissement
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="projects-grid">
          {projects.map(item => (
            <div key={item._id} className="project-card-admin">
              <div className="project-card-media">
                {item.mediaType === 'video' ? (
                  <video src={item.mediaUrl} controls />
                ) : (
                  <img src={item.mediaUrl} alt={item.title} />
                )}
              </div>
              
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
        <p>Aucun accomplissement trouve. Cliquez sur "Ajouter un accomplissement" pour commencer.</p>
      )}
    </>
  );
}

export default ManageTravaux;