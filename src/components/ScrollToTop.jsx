// kevyamon/portfolio/src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant utilitaire invisible.
 * Gère le scroll vers le haut lors d'un changement de route,
 * ou fait défiler l'utilisateur vers une ancre spécifique si un hash est présent.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Si un hash est présent dans l'URL (ex: #parcours)
      const elementId = hash.replace('#', '');
      
      // Petit délai pour s'assurer que le composant est monté et rendu dans le DOM
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Sinon, remonter tout en haut de la page
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;