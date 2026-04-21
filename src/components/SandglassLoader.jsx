//src/components/SandglassLoader.jsx
import { useState, useEffect } from 'react';
import { useServerWakeup } from '../hooks/useServerWakeup';
import './SandglassLoader.css';

const quotes = [
  "La patience est la cle de la reussite.",
  "Le code est une poesie en mouvement constant.",
  "Construire demain, une ligne apres l'autre.",
  "L'innovation commence par la perseverance.",
  "Le meilleur reste a venir, connectons-nous."
];

const SandglassLoader = ({ onFinished }) => {
  const { status, retry } = useServerWakeup();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    if (status === 'loading') {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        onFinished();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, onFinished]);

  return (
    <div className={`sandglass-overlay is-${status}`}>
      {status !== 'error' ? (
        <>
          <div className="sandglass-container">
            <svg className="sandglass-svg" viewBox="0 0 100 150">
              <path d="M10 10 L90 10 L90 40 L55 75 L90 110 L90 140 L10 140 L10 110 L45 75 L10 40 Z" />
              <path className="sand-top" d="M15 15 L85 15 L85 38 L50 73 L15 38 Z" />
              <path className="sand-bottom" d="M50 77 L85 112 L85 135 L15 135 L15 112 Z" />
            </svg>
          </div>

          <div className="quote-container">
            {status === 'loading' ? (
              <p className="quote-text" key={currentQuoteIndex}>
                {quotes[currentQuoteIndex]}
              </p>
            ) : (
              <p className="success-text">On y va !</p>
            )}
          </div>
        </>
      ) : (
        <div className="error-container">
          <div className="sad-icon-text">X_X</div>
          <p className="quote-text">Le serveur met plus de temps que d'habitude</p>
          <button className="retry-button" onClick={retry}>
            Actualiser
          </button>
        </div>
      )}
    </div>
  );
};

export default SandglassLoader;