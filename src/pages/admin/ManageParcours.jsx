// src/pages/admin/ManageParcours.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';

import './Parcours.css'; // Notre CSS pour la liste
import '../../components/admin/AdminForms.css'; // Notre CSS pour les formulaires

import ParcoursForm from '../../components/admin/ParcoursForm';
import ConfirmationModal from '../../components/ConfirmationModal';
import LoadingSpinner from '../../components/admin/LoadingSpinner';

// Icônes pour la liste
const DragHandleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

function ManageParcours() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // États de gestion
  const [showForm, setShowForm] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // 1. Charger les items au démarrage
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await apiClient.get('/api/timeline');
      setItems(data); // L'API les renvoie déjà triés par 'order'
    } catch (error) {
      toast.error('Erreur lors du chargement du parcours.');
    }
    setIsLoading(false);
  };

  // 2. Logique du Glisser-Déposer (Drag-and-Drop)
  const handleDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return; // Pas de changement
    }

    // 1. Réorganiser visuellement la liste (optimiste)
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, reorderedItem);
    
    setItems(newItems); // Met à jour l'interface immédiatement

    // 2. Envoyer le nouvel ordre à l'API
    const orderedIds = newItems.map(item => item._id);
    try {
      await apiClient.put('/api/timeline/reorder', { orderedIds });
      toast.success('Ordre mis à jour !');
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'ordre.");
      // Si l'API échoue, on annule le changement visuel
      fetchItems(); 
    }
  };

  // 3. Logique d'ouverture des formulaires
  const openCreateForm = () => {
    setItemToEdit(null); // S'assurer qu'on est en mode "création"
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setItemToEdit(item); // Passer l'item à modifier
    setShowForm(true);
  };

  // 4. Logique de soumission (appelée par le composant ParcoursForm)
  const handleFormSubmit = (updatedItem, mode) => {
    if (mode === 'create') {
      // Ajoute le nouvel item à la fin de la liste
      setItems(prev => [...prev, updatedItem]);
    } else {
      // Met à jour l'item modifié dans la liste
      setItems(prev => 
        prev.map(item => (item._id === updatedItem._id ? updatedItem : item))
      );
    }
    setShowForm(false); // Fermer le formulaire
  };
  
  // 5. Logique de suppression
  const openDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await apiClient.delete(`/api/timeline/${itemToDelete._id}`);
      setItems(prev => prev.filter(item => item._id !== itemToDelete._id));
      toast.success('Étape supprimée.');
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
        <ParcoursForm
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
        title="Supprimer l'étape"
        message={`Êtes-vous sûr de vouloir supprimer: "${itemToDelete?.title}" ?`}
      />

      {/* --- SECTION PRINCIPALE (LISTE) --- */}
      <div className="parcours-list-header">
        <h2>Gérer le Parcours</h2>
        <button className="btn btn-primary" onClick={openCreateForm}>
          Ajouter une étape
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="timeline-items">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                
                {items.map((item, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`parcours-item ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        {/* Poignée pour Glisser-Déposer */}
                        <span className="drag-handle" {...provided.dragHandleProps}>
                          <DragHandleIcon />
                        </span>
                        
                        {/* Icône */}
                        <div className="item-icon">
                          <img src={`/src/assets/icons/${item.icon}.svg`} alt={item.icon} />
                        </div>
                        
                        {/* Détails */}
                        <div className="item-details">
                          <h4>{item.title}</h4>
                          <p>{item.year} - {item.location}</p>
                        </div>
                        
                        {/* Actions */}
                        <div className="item-actions">
                          <button className="edit" onClick={() => openEditForm(item)} title="Modifier">
                            <EditIcon />
                          </button>
                          <button className="delete" onClick={() => openDeleteConfirmation(item)} title="Supprimer">
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}

export default ManageParcours;