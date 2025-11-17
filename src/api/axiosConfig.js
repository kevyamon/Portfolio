// src/api/axiosConfig.js
import axios from 'axios';

// On crée une "instance" d'axios
const apiClient = axios.create({
  // 1. L'URL de base de notre API (lue depuis le fichier .env)
  baseURL: import.meta.env.VITE_API_URL,
  
  // 2. On autorise l'envoi de cookies (pour notre "pass" JWT)
  withCredentials: true, 
});

export default apiClient;