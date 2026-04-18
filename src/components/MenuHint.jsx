//kevyamon/portfolio/src/components/MenuHint.jsx
import { useUI } from '../context/UIContext';
import './MenuHint.css';

function MenuHint() {
  const { openSidebar } = useUI();

  return (
    <div 
      className="menu-hint" 
      onClick={openSidebar}
      style={{ cursor: 'pointer' }}
    >
      <p>Decouvre plus de sections via le menu</p>
      <div className="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default MenuHint;