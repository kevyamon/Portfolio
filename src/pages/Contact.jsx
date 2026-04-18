//src/pages/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import { toast } from 'react-hot-toast';

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const inputVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post('/api/messages', formData);
      toast.success('Message envoye avec succes.');
      setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Veuillez reessayer.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-page page-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contactez-moi
      </motion.h2>

      <div className="contact-wrapper">
        <motion.form 
          onSubmit={handleSubmit} 
          className="step-card contact-form"
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="form-group-custom" variants={inputVariants}>
            <label htmlFor="name">Nom complet</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="form-input"
              placeholder="Votre nom"
            />
          </motion.div>

          <motion.div className="form-group-custom" variants={inputVariants}>
            <label htmlFor="email">Adresse Email</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-input"
              placeholder="votre@email.com"
            />
          </motion.div>

          <motion.div className="form-group-custom" variants={inputVariants}>
            <label htmlFor="message">Votre Message</label>
            <textarea 
              id="message"
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows="5"
              className="form-input textarea-input"
              placeholder="En quoi puis-je vous aider ?"
            />
          </motion.div>

          <motion.button 
            type="submit" 
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            variants={inputVariants}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Envoi...' : 'Envoyer'}
          </motion.button>
        </motion.form>
      </div>

      <MenuHint />
    </section>
  );
}

export default Contact;