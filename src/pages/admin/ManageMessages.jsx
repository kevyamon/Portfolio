// src/pages/admin/ManageMessages.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';
import './Messages.css'; // CSS dédié pour la boîte de réception
import ConfirmationModal from '../../components/ConfirmationModal'; // Notre nouveau modal

// Icônes
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const UnreadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"></path><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>;
const ReplyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>;


function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // États pour le modal de suppression
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // 1. Charger tous les messages au démarrage
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.get('/api/messages');
      setMessages(data);
    } catch (error) {
      toast.error('Impossible de charger les messages.');
    }
    setIsLoading(false);
  };

  // 2. Logique de sélection d'un message
  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);
    
    // 3. Si le message est "non lu", on le met à jour
    if (!message.isRead) {
      try {
        const { data: updatedMessage } = await apiClient.put(`/api/messages/${message._id}/read`);
        // Mettre à jour la liste sans recharger
        setMessages(prev => 
          prev.map(m => (m._id === message._id ? updatedMessage : m))
        );
        // Mettre à jour le message sélectionné
        setSelectedMessage(updatedMessage);
      } catch (error) {
        toast.error('Erreur lors du marquage comme lu.');
      }
    }
  };

  // 4. Logique de suppression
  const openDeleteModal = (message) => {
    setMessageToDelete(message);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    
    try {
      await apiClient.delete(`/api/messages/${messageToDelete._id}`);
      toast.success('Message supprimé !');
      
      // Mettre à jour l'état
      setMessages(prev => prev.filter(m => m._id !== messageToDelete._id));
      if (selectedMessage && selectedMessage._id === messageToDelete._id) {
        setSelectedMessage(null); // Vider le panneau de lecture
      }
      
    } catch (error) {
      toast.error('Erreur lors de la suppression.');
    } finally {
      setIsModalOpen(false);
      setMessageToDelete(null);
    }
  };

  // 5. Logique "Marquer non lu" (Votre "surprise")
  const handleMarkAsUnread = async () => {
    if (!selectedMessage) return;
    try {
      const { data: updatedMessage } = await apiClient.put(`/api/messages/${selectedMessage._id}/unread`);
      toast.success('Marqué comme non lu.');
      
      setMessages(prev => 
        prev.map(m => (m._id === selectedMessage._id ? updatedMessage : m))
      );
      setSelectedMessage(updatedMessage);
      
    } catch (error) {
      toast.error('Erreur.');
    }
  };
  
  // 6. Logique "Répondre" (Votre "surprise")
  const handleReply = () => {
    if (!selectedMessage) return;
    const subject = encodeURIComponent(`Re: Prise de contact (portfolio)`);
    window.location.href = `mailto:${selectedMessage.email}?subject=${subject}`;
  };

  return (
    <div className="messages-layout">
      
      {/* --- PANNEAU DE GAUCHE : LISTE DES MESSAGES --- */}
      <aside className="message-list-sidebar">
        <div className="message-list-header">
          <h2>Boîte de réception ({messages.filter(m => !m.isRead).length})</h2>
        </div>
        <div className="message-list-container">
          {isLoading && <p>Chargement...</p>}
          {!isLoading && messages.length === 0 && (
            <p className="empty-list">Aucun message pour le moment.</p>
          )}
          {messages.map(msg => (
            <div 
              key={msg._id} 
              className={`message-item ${!msg.isRead ? 'unread' : ''} ${selectedMessage?._id === msg._id ? 'active' : ''}`}
              onClick={() => handleSelectMessage(msg)}
            >
              <div className="message-item-header">
                <span className="message-item-name">{msg.name}</span>
                <span className="message-item-date">{new Date(msg.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <p className="message-item-preview">{msg.message.substring(0, 50)}...</p>
            </div>
          ))}
        </div>
      </aside>

      {/* --- PANNEAU DE DROITE : LECTURE DU MESSAGE --- */}
      <main className="message-reader">
        {selectedMessage ? (
          <>
            {/* Barre d'outils (Actions) */}
            <div className="message-reader-toolbar">
              <button onClick={handleReply} title="Répondre">
                <ReplyIcon /> Répondre
              </button>
              <button onClick={handleMarkAsUnread} title="Marquer comme non lu" className="action-btn">
                <UnreadIcon />
              </button>
              <button onClick={() => openDeleteModal(selectedMessage)} title="Supprimer" className="action-btn danger">
                <TrashIcon />
              </button>
            </div>
            
            {/* Contenu du message */}
            <div className="message-reader-content">
              <div className="message-reader-header">
                <h3>{selectedMessage.name}</h3>
                <span>{`<${selectedMessage.email}>`}</span>
              </div>
              <div className="message-reader-body">
                <p>{selectedMessage.message}</p>
              </div>
            </div>
          </>
        ) : (
          // Si aucun message n'est sélectionné
          <div className="message-reader-empty">
            <MailIcon />
            <p>Sélectionnez un message pour le lire.</p>
          </div>
        )}
      </main>
      
      {/* --- MODAL DE CONFIRMATION --- */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer le message"
        message="Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible."
      />
    </div>
  );
}

export default ManageMessages;