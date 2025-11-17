// src/components/admin/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';
import './AdminForms.css'; // Notre CSS générique

// Icône d'upload
const UploadIcon = () => <svg xmlns="http://www.w.w.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;

function ProjectForm({ itemToEdit, onFormSubmit, onCancel }) {
  // 1. État du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    mediaType: 'image',
  });
  const [file, setFile] = useState(null); // Le fichier (image/vidéo)
  const [preview, setPreview] = useState(null); // URL de prévisualisation
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Pour la barre de progression

  // 2. Pré-remplir si c'est une modification
  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title,
        description: itemToEdit.description,
        link: itemToEdit.link || '',
        mediaType: itemToEdit.mediaType,
      });
      // On affiche le média qui est déjà sur Cloudinary
      setPreview(itemToEdit.mediaUrl); 
    } else {
      // Réinitialiser pour la création
      setFormData({ title: '', description: '', link: '', mediaType: 'image' });
      setFile(null);
      setPreview(null);
    }
  }, [itemToEdit]);

  // 3. Gérer les changements de texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Gérer la sélection du fichier (la "Surprise")
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Auto-détection du type de média
    const fileType = selectedFile.type.split('/')[0]; // 'image' ou 'video'
    if (fileType === 'video') {
      setFormData((prev) => ({ ...prev, mediaType: 'video' }));
    } else {
      setFormData((prev) => ({ ...prev, mediaType: 'image' }));
    }

    // Créer une URL locale pour la prévisualisation instantanée
    setPreview(URL.createObjectURL(selectedFile));
  };

  // 5. Gérer la soumission (avec barre de progression)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // En mode "Création", un fichier est obligatoire
    if (!itemToEdit && !file) {
      toast.error('Veuillez ajouter un média (image ou vidéo).');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    // 'FormData' est nécessaire pour envoyer des fichiers
    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('link', formData.link);
    dataToSend.append('mediaType', formData.mediaType);
    
    // On n'ajoute le fichier que s'il a été changé
    if (file) {
      dataToSend.append('media', file);
    }
    
    // Configuration Axios pour la barre de progression
    const config = {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percent);
      },
    };

    try {
      if (itemToEdit) {
        // --- MODE MODIFICATION ---
        const { data } = await apiClient.put(`/api/projects/${itemToEdit._id}`, dataToSend, config);
        toast.success('Projet mis à jour !');
        onFormSubmit(data, 'update');
      } else {
        // --- MODE CRÉATION ---
        const { data } = await apiClient.post('/api/projects', dataToSend, config);
        toast.success('Nouveau projet ajouté !');
        onFormSubmit(data, 'create');
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
      console.error(error);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="form-panel">
      <h2>{itemToEdit ? 'Modifier' : 'Ajouter'} un projet</h2>
      <form onSubmit={handleSubmit}>
        
        {/* --- Zone d'Upload --- */}
        <div className="form-group">
          <label>Média (Image ou Vidéo)</label>
          {preview ? (
            <div className="preview-container">
              {formData.mediaType === 'video' ? (
                <video src={preview} controls width="100%">Votre navigateur ne supporte pas la vidéo.</video>
              ) : (
                <img src={preview} alt="Aperçu" />
              )}
              <button type="button" className="btn btn-secondary" onClick={() => { setFile(null); setPreview(null); }}>
                Changer le média
              </button>
            </div>
          ) : (
            <div className="file-drop-zone">
              <UploadIcon />
              <p>Glissez-déposez votre fichier ici</p>
              <p>ou <span>cliquez pour sélectionner</span></p>
              <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleFileChange} 
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          )}
        </div>

        {/* --- Barre de Progression --- */}
        {isLoading && uploadProgress > 0 && (
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        <div className="form-grid two-cols">
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text" id="title" name="title"
              value={formData.title} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Lien (ex: GitHub, YouTube) (Optionnel)</label>
            <input
              type="text" id="link" name="link"
              value={formData.link} onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description" name="description"
            value={formData.description} onChange={handleChange} required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isLoading}>
            Annuler
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? `Envoi (${uploadProgress}%)` : (itemToEdit ? 'Mettre à jour' : 'Ajouter')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;