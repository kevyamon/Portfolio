// src/components/AdminNav.jsx
import { NavLink } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { toast } from 'react-hot-toast';

function AdminNav() {
  
  const handleLogout = async () => {
    try {
      // Nous n'avons pas de route /logout, mais le simple fait
      // de recharger la page sans le cookie JWT suffit.
      // Pour une déconnexion propre, nous devrions créer une route /api/auth/logout
      // qui vide le cookie. Pour l'instant, nous rechargeons simplement.
      
      // La "vraie" façon de faire (si on crée la route backend /logout):
      // await apiClient.post('/api/auth/logout');
      // toast.success('Déconnexion réussie');
      // window.location.href = '/'; // Redirige vers l'accueil
      
      // L'astuce simple (supprimer le cookie manuellement) :
      document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      toast.success('Déconnexion réussie');
      window.location.href = '/'; // Redirige vers l'accueil
      
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Dashboard</h2>
      </div>

      <nav className="admin-nav">
        <ul>
          <li>
            <NavLink to="/admin" end>Tableau de bord</NavLink>
          </li>
          <li>
            <NavLink to="/admin/parcours">Gérer le Parcours</NavLink>
          </li>
          <li>
            <NavLink to="/admin/travaux">Gérer les Travaux</NavLink>
          </li>
          <li>
            <NavLink to="/admin/messages">Voir les Messages</NavLink>
          </li>
        </ul>
      </nav>

      {/* Le bouton "Quitter" est poussé en bas par flex-grow */}
      <button onClick={handleLogout} className="admin-logout-btn">
        Quitter le Dashboard
      </button>
    </aside>
  );
}

export default AdminNav;