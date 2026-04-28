import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './AnimatedBackground.css';

const Cube = ({ size = 100, position = { top: '20%', left: '10%' }, rotationSpeed = 1, delay = 0 }) => {
  const { scrollYProgress } = useScroll();
  
  // Parallaxe et rotation basées sur le scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * rotationSpeed]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 45 + 360 * rotationSpeed]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [45, 45 + 180 * rotationSpeed]);
  
  // Lissage de l'animation
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      className="cube-container"
      style={{ 
        top: position.top, 
        left: position.left,
        y: smoothY,
        width: size,
        height: size
      }}
    >
      <motion.div 
        className="cube"
        style={{ 
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
        }}
      >
        <div className="face front" />
        <div className="face back" />
        <div className="face right" />
        <div className="face left" />
        <div className="face top" />
        <div className="face bottom" />
      </motion.div>
    </motion.div>
  );
};

const EntwinedSquares = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  return (
    <motion.div 
      className="entwined-squares"
      style={{ rotate, scale }}
    >
      <div className="square s1" />
      <div className="square s2" />
      <div className="square s3" />
    </motion.div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="animated-bg-wrapper">
      {/* Texture de fond (grille) */}
      <div className="bg-grid-overlay" />
      
      {/* Formes entrelacées au centre */}
      <EntwinedSquares />
      
      {/* Cubes flottants à différentes profondeurs */}
      <Cube size={120} position={{ top: '15%', left: '5%' }} rotationSpeed={1.2} />
      <Cube size={80} position={{ top: '60%', left: '85%' }} rotationSpeed={0.8} />
      <Cube size={150} position={{ top: '40%', left: '45%' }} rotationSpeed={0.5} />
      <Cube size={60} position={{ top: '80%', left: '20%' }} rotationSpeed={1.5} />
      
      {/* Gradients de lumière (Glow) */}
      <div className="glow-spot spot-1" />
      <div className="glow-spot spot-2" />
    </div>
  );
};

export default AnimatedBackground;
