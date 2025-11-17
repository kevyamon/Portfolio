// src/components/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';
import './AdminNav.css';

function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* Le menu latéral de navigation du dashboard */}
      <AdminNav />
      
      {/* La zone de contenu principale où les pages (Messages, Parcours...) s'afficheront */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;