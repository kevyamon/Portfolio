import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

// Définition des constantes des cubes (tailles, positions et vitesses)
const CUBES_DATA = [
  { id: 1, size: 120, top: '15%', left: '5%', z: -300, rotationSpeed: 0.15, offset: 100 },
  { id: 2, size: 80, top: '60%', left: '85%', z: -150, rotationSpeed: 0.1, offset: 250 },
  { id: 3, size: 150, top: '40%', left: '45%', z: -400, rotationSpeed: 0.05, offset: 50 },
  { id: 4, size: 60, top: '80%', left: '20%', z: -200, rotationSpeed: 0.2, offset: 380 }
];

const AnimatedBackground = () => {
  const cubesRef = useRef([]);
  const squaresRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;

          // 1. Déplacement et rotation des cubes 3D par manipulation directe du style
          CUBES_DATA.forEach((cube, index) => {
            const el = cubesRef.current[index];
            if (el) {
              const rotation = scrolled * cube.rotationSpeed + cube.offset;
              const yPos = scrolled * 0.12 * (index % 2 === 0 ? 1 : -1);
              
              // Utilisation de translate3d pour forcer la création d'un calque de rendu GPU
              el.style.transform = `translate3d(0, ${yPos}px, ${cube.z}px) rotateX(${rotation}deg) rotateY(${rotation * 0.8}deg)`;
            }
          });

          // 2. Rotation passive et légère mise à l'échelle des carrés entrelacés sur scroll
          if (squaresRef.current) {
            const sqRotation = scrolled * 0.04;
            const sqScale = 1 + (scrolled * 0.00008);
            
            squaresRef.current.style.transform = `translate(-50%, -50%) rotate(${sqRotation}deg) scale(${Math.min(sqScale, 1.2)})`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Rendu initial avant le premier scroll
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="animated-bg-wrapper">
      {/* Grille de fond texturée */}
      <div className="bg-grid-overlay" />
      
      {/* Formes entrelacées au centre */}
      <div 
        className="entwined-squares" 
        ref={squaresRef}
        style={{ transform: 'translate(-50%, -50%) rotate(0deg) scale(1)' }}
      >
        <div className="square s1" />
        <div className="square s2" />
        <div className="square s3" />
      </div>
      
      {/* Conteneur 3D global pour les cubes */}
      <div className="cube-scene-container">
        {CUBES_DATA.map((cube, index) => (
          <div 
            key={cube.id}
            className="cube-container"
            ref={el => cubesRef.current[index] = el}
            style={{
              top: cube.top,
              left: cube.left,
              width: cube.size,
              height: cube.size,
              '--size': `${cube.size}px`, // Variable CSS pour positionner les faces 3D de façon dynamique et SOLID
              transform: `translate3d(0, 0, ${cube.z}px) rotateX(${cube.offset}deg) rotateY(${cube.offset * 0.8}deg)`
            }}
          >
            <div className="cube-inner">
              <div className="face face-front" />
              <div className="face face-back" />
              <div className="face face-right" />
              <div className="face face-left" />
              <div className="face face-top" />
              <div className="face face-bottom" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Gradients de lumière d'ambiance */}
      <div className="glow-spot spot-1" />
      <div className="glow-spot spot-2" />
    </div>
  );
};

export default AnimatedBackground;
