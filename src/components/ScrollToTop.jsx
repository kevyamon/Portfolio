// kevyamon/portfolio/src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant utilitaire invisible.
 * Son seul but est de remettre le scroll en haut à chaque changement de page.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remonte instantanément en haut de la page (x=0, y=0)
    window.scrollTo(0, 0);
  }, [pathname]); // Se déclenche uniquement quand le chemin (URL) change

  return null; // Ne rend rien visuellement
}

export default ScrollToTop;