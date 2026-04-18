//src/components/Header.jsx
import { useUI } from '../context/UIContext';
import './Header.css';

function Header() {
  // Le composant est autonome et lit l'état global
  const { isSidebarOpen, toggleSidebar } = useUI();

  return (
    <header className="header">
      <div 
        className={`hamburger ${isSidebarOpen ? 'open' : ''}`} 
        onClick={toggleSidebar}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}

export default Header;