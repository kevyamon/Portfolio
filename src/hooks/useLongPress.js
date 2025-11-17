// src/hooks/useLongPress.js
import { useState, useEffect, useRef } from 'react';

/**
 * Hook pour détecter un appui long sur un élément.
 * Votre "astuce de génie".
 * @param {function} callback - La fonction à appeler après l'appui long
 * @param {number} duration - La durée de l'appui en millisecondes (ex: 10000)
 */
export function useLongPress(callback, duration = 10000) {
  const [pressing, setPressing] = useState(false);
  const timerRef = useRef(null);

  // Événement: quand on commence à appuyer
  const onMouseDown = () => {
    // Si on appuie déjà, on ne fait rien
    if (timerRef.current) return;
    
    setPressing(true);
    // On lance le minuteur
    timerRef.current = setTimeout(() => {
      callback(); // Le temps est écoulé, on appelle la fonction !
      setPressing(false); // On réinitialise
    }, duration);
  };

  // Événement: quand on relâche le bouton
  const onMouseUp = () => {
    // On annule le minuteur (si on n'a pas atteint les 10s)
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPressing(false);
  };

  // Gestion des événements tactiles (pour mobile)
  const onTouchStart = () => onMouseDown();
  const onTouchEnd = () => onMouseUp();

  // Nettoyage au cas où le composant est retiré
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    isPressing: pressing, // Pour un retour visuel (optionnel)
    longPressEvents: {
      onMouseDown,
      onMouseUp,
      onMouseLeave: onMouseUp, // Si la souris sort, on annule
      onTouchStart,
      onTouchEnd,
    },
  };
}