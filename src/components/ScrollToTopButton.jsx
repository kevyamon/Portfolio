// kevyamon/portfolio-frontend/src/components/ScrollToTopButton.jsx
import { useState, useEffect } from 'react';
import './ScrollToTopButton.css';

// 1. Accepter la nouvelle propriété 'longPressEvents'
function ScrollToTopButton({ longPressEvents }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMidpoint = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Sécurité pour éviter division par zéro si docHeight est 0
      if (docHeight === 0) {
        setIsVisible(false);
        return;
      }
      
      const scrollY = window.scrollY;
      // Visible si on a dépassé 50% du contenu
      setIsVisible(scrollY > docHeight * 0.5);
    };

    checkMidpoint();
    window.addEventListener('scroll', checkMidpoint);
    window.addEventListener('resize', checkMidpoint);

    return () => {
      window.removeEventListener('scroll', checkMidpoint);
      window.removeEventListener('resize', checkMidpoint);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    // 2. Appliquer les événements d'appui long directement sur le bouton
    <button 
      className="scroll-to-top" 
      onClick={scrollToTop}
      {...longPressEvents} // <-- VOTRE ASTUCE EST APPLIQUÉE ICI
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5L5 12L6.4 13.4L11 8.8V19H13V8.8L17.6 13.4L19 12L12 5Z" fill="#FFD700" />
      </svg>
    </button>
  );
}

export default ScrollToTopButton;