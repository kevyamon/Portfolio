import './Header.css';

// 1. Je récupère la nouvelle propriété 'isOpen'
function Header({ onToggleSidebar, isOpen }) {
  return (
    <header className="header">
      {/* 2. J'ajoute la classe 'open' si la sidebar est ouverte */}
      <div 
        className={`hamburger ${isOpen ? 'open' : ''}`} 
        onClick={onToggleSidebar}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}

export default Header;
