// src/components/admin/ParcoursForm.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';
import IconSelector from './IconSelector';
import './AdminForms.css'; // Notre CSS générique

function ParcoursForm({ itemToEdit, onFormSubmit, onCancel }) {
  // 1. Initialiser l'état du formulaire
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    location: '',
    description: '',
    icon: 'diploma', // Icône par défaut
  });
  const [isLoading, setIsLoading] = useState(false);

  // 2. Si on reçoit un 'itemToEdit', on pré-remplit le formulaire
  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        year: itemToEdit.year,
        title: itemToEdit.title,
        location: itemToEdit.location,
        description: itemToEdit.description,
        icon: itemToEdit.icon,
      });
    } else {
      // Si c'est pour "Créer", on vide le formulaire
      setFormData({
        year: '',
        title: '',
        location: '',
        description: '',
        icon: 'diploma',
      });
    }
  }, [itemToEdit]); // Se redéclenche à chaque fois que 'itemToEdit' change

  // 3. Gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconSelect = (iconKey) => {
    setFormData((prev) => ({ ...prev, icon: iconKey }));
  };

  // 4. Gérer la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (itemToEdit) {
        // --- MODE MODIFICATION ---
        const { data } = await apiClient.put(`/api/timeline/${itemToEdit._id}`, formData);
        toast.success('Parcours mis à jour !');
        onFormSubmit(data, 'update'); // Envoyer la donnée à jour à la page parente
      } else {
        // --- MODE CRÉATION ---
        const { data } = await apiClient.post('/api/timeline', formData);
        toast.success('Nouvelle étape ajoutée !');
        onFormSubmit(data, 'create'); // Envoyer la nouvelle donnée à la page parente
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-panel">
      <h2>{itemToEdit ? 'Modifier' : 'Ajouter'} une étape</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Le sélecteur d'icônes visuel */}
        <IconSelector 
          selectedIcon={formData.icon} 
          onSelectIcon={handleIconSelect} 
        />

        <div className="form-grid two-cols">
          <div className="form-group">
            <label htmlFor="year">Année / Période</label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Lieu (ex: Lycée, Entreprise...)</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Boutons d'action */}
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Enregistrement...' : (itemToEdit ? 'Mettre à jour' : 'Ajouter')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ParcoursForm;