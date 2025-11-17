import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';

// Données du parcours
const timelineData = [
  {
    year: "2023 – 2025",
    title: "BTS I.A.C. – Option Contrôle",
    location: "Lycée Technique",
    description: "Spécialisation en contrôle qualité, analyses physico-chimiques, microbiologie et HACCP. Réalisation de nombreux TP en laboratoire pour maîtriser les protocoles industriels.",
    icon: "/src/assets/icons/diploma.svg"
  },
  {
    year: "2024",
    title: "Stage – Contrôle Qualité",
    location: "Industrie Agroalimentaire",
    description: "Immersion professionnelle : Analyse sensorielle des produits, prélèvements sur ligne, rédaction de rapports de non-conformité et suivi de la traçabilité.",
    icon: "/src/assets/icons/stage.svg"
  },
  {
    year: "2022 – 2023",
    title: "Bac Pro Laboratoire (LCQ)",
    location: "Lycée [Nom]",
    description: "Apprentissage des bases analytiques : pH-métrie, chromatographie sur couche mince, titrage. Projet final sur la conservation des aliments.",
    icon: "/src/assets/icons/lab.svg"
  },
  {
    year: "En cours",
    title: "Portfolio Académique",
    location: "Projet Personnel",
    description: "Développement de ce site web interactif pour présenter mes compétences techniques et ma passion pour la chimie alimentaire.",
    icon: "/src/assets/icons/code.svg"
  }
];

// Animations Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3 // Décalage de 0.3s entre chaque étape
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 }, // Arrive de la gauche
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function Parcours() {
  return (
    <section className="parcours-page page-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mon Parcours
      </motion.h2>

      <motion.div 
        className="timeline-vertical"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {timelineData.map((item, index) => (
          <motion.div key={index} className="timeline-step" variants={itemVariants}>
            
            {/* Colonne Gauche : Marqueur + Ligne */}
            <div className="step-marker">
              <div className="step-icon">
                <img src={item.icon} alt="icon" />
              </div>
              {/* La ligne pointillée est gérée en CSS, sauf pour le dernier item */}
              <div className="step-line"></div>
            </div>

            {/* Colonne Droite : Carte de contenu */}
            <div className="step-content">
              <div className="step-card">
                <span className="step-year">{item.year}</span>
                <h3>{item.title}</h3>
                <span className="step-location">{item.location}</span>
                <p className="step-desc">{item.description}</p>
              </div>
            </div>

          </motion.div>
        ))}
      </motion.div>

      <MenuHint />
    </section>
  );
}

export default Parcours;