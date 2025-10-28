import { motion } from 'framer-motion';
import '../styles/pages.css';
import MenuHint from '../components/MenuHint';

const timelineData = [
  {
    year: "2023 – 2025",
    title: "BTS Industrie Agroalimentaire et Chimique – Option Contrôle",
    location: "Lycée Technique de [Ville]",
    description: "Spécialisation en contrôle qualité, analyses physico-chimiques, microbiologie et HACCP. Réalisation de TP en laboratoire.",
    icon: "/src/assets/icons/diploma.svg",
    color: "from-green-500 to-emerald-600"
  },
  {
    year: "2024",
    title: "Stage – Contrôle Qualité",
    location: "Entreprise [Nom ou Secteur]",
    description: "Analyse sensorielle, prélèvements, rédaction de rapports qualité, traçabilité.",
    icon: "/src/assets/icons/stage.svg",
    color: "from-blue-500 to-cyan-600"
  },
  {
    year: "2022 – 2023",
    title: "Bac Pro Laboratoire Contrôle Qualité",
    location: "[Nom du lycée]",
    description: "Techniques analytiques : pH-métrie, chromatographie, titrage. Projet sur la conservation.",
    icon: "/src/assets/icons/lab.svg",
    color: "from-purple-500 to-pink-600"
  },
  {
    year: "En cours",
    title: "Portfolio Académique",
    location: "Projet Personnel",
    description: "Création d’un portfolio immersif pour présenter mes compétences en chimie alimentaire.",
    icon: "/src/assets/icons/code.svg",
    color: "from-orange-500 to-red-600"
  }
];

function Parcours() {
  return (
    <section className="parcours-page page-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mon Parcours
      </motion.h2>

      <div className="timeline-pro">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline-card ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="card-inner">
              <motion.div 
                className="card-icon"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <img src={item.icon} alt={item.title} />
              </motion.div>

              <div className={`card-content bg-gradient-to-br ${item.color}`}>
                <motion.span 
                  className="card-year"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.year}
                </motion.span>
                <h3>{item.title}</h3>
                <span className="card-location">{item.location}</span>
                <p>{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <MenuHint />
    </section>
  );
}

export default Parcours;