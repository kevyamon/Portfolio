import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const linesRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;

          // Effet de parallaxe sur les lignes blueprint de fond
          if (linesRef.current) {
            linesRef.current.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="animated-bg-wrapper">
      {/* Grille de fond principale (blueprint) */}
      <div className="bg-grid-overlay" />
      
      {/* Lignes techniques et annotations blueprint */}
      <div className="blueprint-lines-container" ref={linesRef}>
        {/* Lignes verticales de guidage */}
        <div className="bp-line bp-vertical bp-v-1">
          <span className="bp-label">COORD_X_01</span>
        </div>
        <div className="bp-line bp-vertical bp-v-2">
          <span className="bp-label">COORD_X_02</span>
        </div>
        <div className="bp-line bp-vertical bp-v-3">
          <span className="bp-label">SYSTEM_GRID_RIGHT</span>
        </div>

        {/* Lignes horizontales de guidage */}
        <div className="bp-line bp-horizontal bp-h-1">
          <span className="bp-label">BASE_LINE_ALIGN_T1</span>
        </div>
        <div className="bp-line bp-horizontal bp-h-2">
          <span className="bp-label">SECTION_ALIGN_MID</span>
        </div>
        <div className="bp-line bp-horizontal bp-h-3">
          <span className="bp-label">SYSTEM_FOOTER_ALIGN</span>
        </div>

        {/* Cercles de visée / Cibles techniques */}
        <div className="bp-crosshair bp-ch-1" />
        <div className="bp-crosshair bp-ch-2" />
        
        {/* Points de coordonnées */}
        <div className="bp-dot bp-dot-1" />
        <div className="bp-dot bp-dot-2" />
        <div className="bp-dot bp-dot-3" />
      </div>
      
      {/* Spots de lueur d'ambiance bleue */}
      <div className="glow-spot spot-1" />
      <div className="glow-spot spot-2" />
    </div>
  );
};

export default AnimatedBackground;
