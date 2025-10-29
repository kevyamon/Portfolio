import { motion } from 'framer-motion';

function PageTransition({ children }) {
  return (
    <>
      {/* Ce composant est maintenant simplifié.
        Il ne gère QUE le fondu d'apparition du contenu.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default PageTransition;
