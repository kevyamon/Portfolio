// src/components/LoginModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoginModal.css';
import apiClient from '../api/axiosConfig'; 
import { toast } from 'react-hot-toast'; 

// --- Icône Oeil (Afficher) ---
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

// --- Icône Oeil Barré (Masquer) ---
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

function LoginModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await apiClient.post('/api/auth/login', { password });
      
      toast.success('Connexion réussie ! Redirection...');
      
      // --- CORRECTION DU BUG DE REDIRECTION ---
      // Au lieu de recharger la page actuelle (reload)...
      // window.location.reload(); 
      
      // ...Nous redirigeons l'utilisateur directement vers le Dashboard.
      window.location.href = '/admin'; 
      
    } catch (error) {
      toast.error('Mot de passe invalide.');
      setIsLoading(false);
      setPassword(''); 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="login-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="login-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="login-modal-close" onClick={onClose}>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>

            <h3>Accès Administrateur</h3>
            <p>Veuillez entrer le mot de passe d'accès.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <div 
                  className="password-icon" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </div>
              </div>

              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Vérification...' : 'Valider'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginModal;