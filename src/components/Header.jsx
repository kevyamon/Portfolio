import './Header.css';

function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="hamburger" onClick={onToggleSidebar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}

export default Header;