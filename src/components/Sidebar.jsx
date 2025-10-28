import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/" onClick={onClose}>Accueil</Link></li>
            <li><Link to="/parcours" onClick={onClose}>Parcours</Link></li>
            <li><Link to="/travaux" onClick={onClose}>Travaux Pratiques</Link></li>
            <li><Link to="/contact" onClick={onClose}>Contact</Link></li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;