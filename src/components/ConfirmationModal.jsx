// src/components/ConfirmationModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmationModal.css';

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="confirm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="confirm-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="confirm-buttons">
              <button className="btn-cancel" onClick={onClose}>
                Annuler
              </button>
              <button className="btn-confirm" onClick={onConfirm}>
                Confirmer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmationModal;