//src/components/admin/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';
import './AdminForms.css'; 

const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;

function ProjectForm({ itemToEdit, onFormSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    mediaType: 'image',
  });
  const [file, setFile] = useState(null); 
  const [preview, setPreview] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); 

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title,
        description: itemToEdit.description,
        link: itemToEdit.link || '',
        mediaType: itemToEdit.mediaType,
      });
      setPreview(itemToEdit.mediaUrl); 
    } else {
      setFormData({ title: '', description: '', link: '', mediaType: 'image' });
      setFile(null);
      setPreview(null);
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const fileType = selectedFile.type.split('/')[0]; 
    if (fileType === 'video') {
      setFormData((prev) => ({ ...prev, mediaType: 'video' }));
    } else {
      setFormData((prev) => ({ ...prev, mediaType: 'image' }));
    }

    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemToEdit && !file) {
      toast.error('Veuillez ajouter un media (image ou video).');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('link', formData.link);
    dataToSend.append('mediaType', formData.mediaType);
    
    if (file) {
      dataToSend.append('media', file);
    }
    
    const config = {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percent);
      },
    };

    try {
      if (itemToEdit) {
        const { data } = await apiClient.put(`/api/projects/${itemToEdit._id}`, dataToSend, config);
        toast.success('Accomplissement mis a jour.');
        onFormSubmit(data, 'update');
      } else {
        const { data } = await apiClient.post('/api/projects', dataToSend, config);
        toast.success('Nouvel accomplissement ajoute.');
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
      <h2>{itemToEdit ? 'Modifier' : 'Ajouter'} un accomplissement</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Media (Image ou Video)</label>
          {preview ? (
            <div className="preview-container">
              {formData.mediaType === 'video' ? (
                <video src={preview} controls width="100%">Votre navigateur ne supporte pas la video.</video>
              ) : (
                <img src={preview} alt="Apercu" />
              )}
              <button type="button" className="btn btn-secondary" onClick={() => { setFile(null); setPreview(null); }}>
                Changer le media
              </button>
            </div>
          ) : (
            <label className="file-drop-zone">
              <UploadIcon />
              <p>Appuyez pour selectionner</p>
              <p style={{ fontSize: '0.8em', opacity: 0.7 }}>ou glissez un fichier ici</p>
              
              <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>

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
            <label htmlFor="link">Lien de la ressource (Optionnel)</label>
            <input
              type="text" id="link" name="link"
              value={formData.link} onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description detaillee</label>
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
            {isLoading ? `Envoi (${uploadProgress}%)` : (itemToEdit ? 'Mettre a jour' : 'Ajouter')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;