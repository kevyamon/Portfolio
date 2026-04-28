//src/components/SandglassLoader.jsx
import { useState, useEffect } from 'react';
import { useServerWakeup } from '../hooks/useServerWakeup';
import './SandglassLoader.css';

const quotes = [
  "La patience est la clé de la réussite.",
  "Le code est une poésie en mouvement constant.",
  "Construire demain, une ligne après l'autre.",
  "L'innovation commence par la persévérance.",
  "Le meilleur reste à venir, connectons-nous."
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
            <svg className="sandglass-svg" viewBox="0 0 100 160">
              {/* Cadre du sablier */}
              <path className="sandglass-frame" d="M20 10 H80 M20 150 H80" />
              <path className="sandglass-glass" d="M25 15 L75 15 C75 15 75 55 50 80 C25 55 25 15 25 15 Z M25 145 L75 145 C75 145 75 105 50 80 C25 105 25 145 25 145 Z" />
              
              {/* Sable du haut */}
              <path className="sand-top" d="M30 20 H70 C70 20 70 50 50 75 C30 50 30 20 30 20 Z" />
              
              {/* Le filet de sable */}
              <line className="sand-stream" x1="50" y1="75" x2="50" y2="140" />
              
              {/* Sable du bas */}
              <path className="sand-bottom" d="M30 140 H70 C70 140 70 110 50 85 C30 110 30 140 30 140 Z" />
              
              {/* Reflet pour l'effet premium */}
              <path className="glass-highlight" d="M35 25 Q40 40 35 60" />
            </svg>
          </div>

          <div className="quote-container">
            {status === 'loading' ? (
              <p className="quote-text" key={currentQuoteIndex}>
                {quotes[currentQuoteIndex]}
              </p>
            ) : (
              <p className="success-text">Préparation terminée !</p>
            )}
          </div>
        </>
      ) : (
        <div className="error-container">
          <div className="sad-icon-text">:(</div>
          <p className="quote-text">Le serveur met plus de temps que prévu...</p>
          <button className="retry-button" onClick={retry}>
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
};

export default SandglassLoader;