// src/pages/admin/DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';
import './Dashboard.css'; // Importation de notre nouveau CSS

// Icônes simples pour les cartes
const MessageIcon = () => <svg /* ... SVG ... */ xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const ProjectIcon = () => <svg /* ... SVG ... */ xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
const TimelineIcon = () => <svg /* ... SVG ... */ xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;


function DashboardHome() {
  // États pour stocker nos statistiques
  const [stats, setStats] = useState({
    messages: 0,
    projects: 0,
    timelineItems: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Au chargement de la page, aller chercher les données sur le backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // 1. Appeler le backend (Render) pour avoir les messages
        const messagesRes = await apiClient.get('/api/messages');
        // 2. Appeler le backend (Render) pour avoir les projets
        const projectsRes = await apiClient.get('/api/projects');
        // 3. Appeler le backend (Render) pour avoir le parcours
        const timelineRes = await apiClient.get('/api/timeline');

        // Filtrer les messages non lus
        const unreadMessages = messagesRes.data.filter(msg => !msg.isRead).length;
        
        // Mettre à jour nos statistiques
        setStats({
          messages: unreadMessages,
          projects: projectsRes.data.length,
          timelineItems: timelineRes.data.length,
        });
        
        // Garder les 3 messages les plus récents pour l'aperçu
        setRecentMessages(messagesRes.data.slice(0, 3));

      } catch (error) {
        toast.error("Erreur lors du chargement du dashboard.");
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Chargement du Dashboard...</div>;
  }

  return (
    <div className="dashboard-home">
      <h1>Bienvenue, Architecte !</h1>
      <p>Voici un aperçu de l'activité de votre portfolio.</p>

      {/* --- Section des Cartes Statistiques --- */}
      <div className="stats-grid">
        <div className="stat-card messages">
          <div className="stat-icon"><MessageIcon /></div>
          <div className="stat-info">
            <span className="stat-number">{stats.messages}</span>
            <span className="stat-label">Message{stats.messages > 1 ? 's' : ''} non lu{stats.messages > 1 ? 's' : ''}</span>
          </div>
          <Link to="/admin/messages" className="stat-link">Voir les messages</Link>
        </div>

        <div className="stat-card projects">
          <div className="stat-icon"><ProjectIcon /></div>
          <div className="stat-info">
            <span className="stat-number">{stats.projects}</span>
            <span className="stat-label">Projet{stats.projects > 1 ? 's' : ''} publié{stats.projects > 1 ? 's' : ''}</span>
          </div>
          <Link to="/admin/travaux" className="stat-link">Gérer les travaux</Link>
        </div>

        <div className="stat-card timeline">
          <div className="stat-icon"><TimelineIcon /></div>
          <div className="stat-info">
            <span className="stat-number">{stats.timelineItems}</span>
            <span className="stat-label">Item{stats.timelineItems > 1 ? 's' : ''} de parcours</span>
          </div>
          <Link to="/admin/parcours" className="stat-link">Gérer le parcours</Link>
        </div>
      </div>

      {/* --- Section des Messages Récents --- */}
      <div className="recent-messages">
        <h2>Derniers Messages Reçus</h2>
        {recentMessages.length > 0 ? (
          <ul className="message-list">
            {recentMessages.map(msg => (
              <li key={msg._id} className={!msg.isRead ? 'unread' : ''}>
                <div className="message-header">
                  <strong>{msg.name}</strong>
                  <span className="message-date">{new Date(msg.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <p className="message-preview">{msg.message.substring(0, 100)}...</p>
                {/* 'isRead' est utilisé pour le style (non lu = en gras) */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun message reçu pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default DashboardHome;