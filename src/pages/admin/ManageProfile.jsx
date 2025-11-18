// kevyamon/portfolio/src/pages/admin/ManageProfile.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';
import '../../components/admin/AdminForms.css'; // On réutilise le CSS des formulaires
import LoadingSpinner from '../../components/admin/LoadingSpinner';

// Icône d'upload
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;

function ManageProfile() {
  const [formData, setFormData] = useState({
    titleLine1: '',
    titleLine2: '', // Le nom en vert (Highlight)
    titleLine3: '',
    subtitle: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Charger le profil existant
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get('/api/profile');
        if (data) {
          setFormData({
            titleLine1: data.titleLine1,
            titleLine2: data.titleLine2,
            titleLine3: data.titleLine3,
            subtitle: data.subtitle,
          });
          setPreview(data.imageUrl);
        }
      } catch (error) {
        toast.error("Erreur lors du chargement du profil.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Gestion des champs texte
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 3. Gestion de l'image
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 4. Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const dataToSend = new FormData();
    dataToSend.append('titleLine1', formData.titleLine1);
    dataToSend.append('titleLine2', formData.titleLine2);
    dataToSend.append('titleLine3', formData.titleLine3);
    dataToSend.append('subtitle', formData.subtitle);
    
    if (file) {
      dataToSend.append('image', file);
    }

    try {
      // On utilise PUT pour mettre à jour (ou créer si inexistant)
      await apiClient.put('/api/profile', dataToSend);
      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="form-panel">
      <h2>Modifier mon Identité</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Zone Photo */}
        <div className="form-group">
          <label>Photo de Profil</label>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {preview ? (
              <div className="preview-container" style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #4ade80' }}>
                <img src={preview} alt="Aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div className="file-drop-zone" style={{ width: '150px', height: '150px', borderRadius: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px' }}>
                <UploadIcon />
                <span style={{ fontSize: '0.8rem' }}>Choisir une photo</span>
              </div>
            )}
            
            <div style={{ flex: 1 }}>
               <input 
                type="file" 
                accept="image/*" 
                id="profile-upload"
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
              <label htmlFor="profile-upload" className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-block' }}>
                Changer la photo
              </label>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#aaa' }}>
                Format carré recommandé. JPG ou PNG.
              </p>
            </div>
          </div>
        </div>

        {/* Champs Texte */}
        <div className="form-grid two-cols">
          <div className="form-group">
            <label>Ligne 1 (Intro)</label>
            <input 
              type="text" name="titleLine1" 
              value={formData.titleLine1} onChange={handleChange} 
              placeholder="Ex: Bonjour, je suis"
            />
          </div>
          <div className="form-group">
            <label>Ligne 2 (Nom en vert)</label>
            <input 
              type="text" name="titleLine2" 
              value={formData.titleLine2} onChange={handleChange} 
              placeholder="Ex: Kevy"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Ligne 3 (Titre/Statut)</label>
          <input 
            type="text" name="titleLine3" 
            value={formData.titleLine3} onChange={handleChange} 
            placeholder="Ex: Étudiant en I.A.C..."
          />
        </div>

        <div className="form-group">
          <label>Sous-titre (Description courte)</label>
          <textarea 
            name="subtitle" 
            value={formData.subtitle} onChange={handleChange} 
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Enregistrement...' : 'Mettre à jour le site'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageProfile;