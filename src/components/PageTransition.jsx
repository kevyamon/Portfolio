import { motion } from 'framer-motion';

function PageTransition({ children }) {
  return (
    <>
      <motion.div
        className="page-wipe"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <motion.div
        className="page-wipe reverse"
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      />
      {children}
    </>
  );
}

export default PageTransition;