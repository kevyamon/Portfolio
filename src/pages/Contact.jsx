import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';
import apiClient from '../api/axiosConfig';
import { toast } from 'react-hot-toast';

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
      toast.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Réessayez.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-page page-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contactez-moi
      </motion.h2>

      <div className="container" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} className="step-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Nom complet</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Message</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows="5"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff', resize: 'vertical' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              background: 'linear-gradient(135deg, #4ade80, #22c55e)', 
              color: '#0f172a', 
              fontWeight: 'bold', 
              padding: '14px', 
              borderRadius: '8px', 
              border: 'none', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
          </button>
        </form>
      </div>

      <MenuHint />
    </section>
  );
}

export default Contact;