// kevyamon/portfolio/src/components/AdminNav.jsx
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './AdminNav.css';

function AdminNav() {
  
  const handleLogout = async () => {
    try {
      // Suppression manuelle du cookie pour déconnecter
      document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      toast.success('Déconnexion réussie');
      window.location.href = '/'; 
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
            <NavLink to="/admin/profile">Identité / Accueil</NavLink> {/* <-- NOUVEAU LIEN */}
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

      <button onClick={handleLogout} className="admin-logout-btn">
        Quitter le Dashboard
      </button>
    </aside>
  );
}

export default AdminNav;