// kevyamon/portfolio/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useSocket } from '../context/SocketContext';

function Home() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();

  const fetchProfile = async () => {
    try {
      const { data } = await apiClient.get('/api/profile');
      setProfile(data);
    } catch (error) {
      console.error("Erreur chargement profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    if (socket) {
      socket.on('profile_updated', () => {
        console.log("⚡ Profil mis à jour !");
        fetchProfile();
      });
    }

    return () => {
      if (socket) socket.off('profile_updated');
    };
  }, [socket]);

  if (isLoading) return <div className="home-page"><LoadingSpinner /></div>;

  // Valeurs par défaut si la base de données est vide
  const titleLine1 = profile?.titleLine1 || "Bonjour, je suis";
  const titleLine2 = profile?.titleLine2 || "Kevy";
  const titleLine3 = profile?.titleLine3 || "Étudiant en I.A.C. – Option Contrôle";
  const subtitle = profile?.subtitle || "Spécialisé en contrôle qualité, analyse sensorielle et sécurité alimentaire.";
  const imageUrl = profile?.imageUrl || "/src/assets/profile.jpg"; // Fallback sur l'image locale si pas d'image Cloudinary

  return (
    <section className="home-page">
      <div className="home-content">
        <div className="home-image">
          <img src={imageUrl} alt="Profil" className="profile-img" />
        </div>
        <div className="home-text">
          <h1 className="home-title">
            <span className="line">{titleLine1}</span>
            <span className="line highlight">{titleLine2}</span>
            <span className="line">{titleLine3}</span>
          </h1>
          <p className="home-subtitle">
            {subtitle}
          </p>
          <button className="cta-button" onClick={() => document.querySelector('.hamburger')?.click()}>
            Explorer via le menu
          </button>
        </div>
      </div>
      <MenuHint />
    </section>
  );
}

export default Home;