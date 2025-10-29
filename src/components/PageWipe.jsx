import { motion } from 'framer-motion';
import './PageWipe.css';

function PageWipe() {
  
  const wipeVariants = {
    // 1. Initial (quand il arrive) :
    //    Il commence complètement à gauche, hors écran.
    initial: { x: '-100%' },
    
    // 2. Animate (ce qu'il fait) :
    //    Il glisse de la gauche vers la droite, jusqu'à sortir par la droite.
    animate: { x: '100%' },
    
    // 3. Exit (quand il part) :
    //    Il glisse aussi de la gauche vers la droite.
    //    (L'ancien rideau et le nouveau feront le même mouvement)
    exit: { x: '100%' }
  };

  return (
    <>
      <motion.div
        className="page-wipe"
        variants={wipeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </>
  );
}

export default PageWipe;
