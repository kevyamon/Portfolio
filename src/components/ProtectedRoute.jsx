// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig'; // Notre "téléphone" API

const ProtectedRoute = () => {
  // Remplacer l'ancien hook 'useAuthStatus' par une logique locale
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    // Quand le composant se charge, on "ping" le backend
    const checkStatus = async () => {
      try {
        // 1. On appelle notre nouvelle route sécurisée
        await apiClient.get('/api/auth/status');
        
        // 2. Si l'appel réussit (pas d'erreur 401), c'est qu'on est connecté
        setIsLoggedIn(true);
      } catch (error) {
        // 3. Si l'appel échoue (erreur 401), on n'est pas connecté
        setIsLoggedIn(false);
      } finally {
        // 4. Dans tous les cas, on a fini de vérifier
        setCheckingStatus(false);
      }
    };

    checkStatus();
  }, []); // Se lance une seule fois au chargement

  
  // La logique de rendu reste la même :
  if (checkingStatus) {
    return <div>Vérification de la session...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;