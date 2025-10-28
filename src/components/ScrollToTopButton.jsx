import { useState, useEffect } from 'react';
import './ScrollToTopButton.css';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMidpoint = () => {
      const midpoint = window.innerHeight / 2;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

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
    <button className="scroll-to-top" onClick={scrollToTop}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5L5 12L6.4 13.4L11 8.8V19H13V8.8L17.6 13.4L19 12L12 5Z" fill="#FFD700" />
      </svg>
    </button>
  );
}

export default ScrollToTopButton;