// src/utils/iconLibrary.jsx
// On importe un paquet d'icônes (FontAwesome, Material, etc.)
import { 
  FaGraduationCap, FaUniversity, FaCertificate, FaBookOpen, FaAward, // Études
  FaBriefcase, FaBuilding, FaHandshake, FaUserTie, FaLaptopCode, // Travail
  FaFlask, FaMicroscope, FaVial, FaDna, FaBiohazard, // Science (Ton domaine !)
  FaCode, FaDatabase, FaServer, FaRobot, FaMobileAlt, // Tech
  FaGlobe, FaMapMarkerAlt, FaStar, FaTrophy, FaMedal, // Divers
  FaLeaf, FaAppleAlt // Agro
} from "react-icons/fa";

// La map qui relie le "Nom stocké en BDD" -> "Le Composant Visuel"
export const iconLibrary = {
  // --- Éducation / Diplômes ---
  diploma: { component: FaGraduationCap, label: "Diplôme" },
  university: { component: FaUniversity, label: "Université" },
  certificate: { component: FaCertificate, label: "Certificat" },
  book: { component: FaBookOpen, label: "Formation" },
  award: { component: FaAward, label: "Récompense" },

  // --- Emploi / Stage ---
  stage: { component: FaBriefcase, label: "Stage" }, // On garde 'stage' pour la compatibilité
  job: { component: FaUserTie, label: "Emploi" },
  company: { component: FaBuilding, label: "Entreprise" },
  partner: { component: FaHandshake, label: "Partenariat" },
  freelance: { component: FaLaptopCode, label: "Freelance" },

  // --- I.A.C / Science (Spécial pour toi) ---
  lab: { component: FaFlask, label: "Laboratoire" },
  microbio: { component: FaMicroscope, label: "Microbiologie" },
  chemistry: { component: FaVial, label: "Chimie" },
  dna: { component: FaDna, label: "Génétique" },
  hazard: { component: FaBiohazard, label: "Risque/Qualité" },
  agro: { component: FaLeaf, label: "Agronomie" },
  food: { component: FaAppleAlt, label: "Alimentaire" },

  // --- Tech / Dev ---
  code: { component: FaCode, label: "Code" },
  db: { component: FaDatabase, label: "Données" },
  server: { component: FaServer, label: "Backend" },
  bot: { component: FaRobot, label: "IA / Bot" },
  mobile: { component: FaMobileAlt, label: "Mobile" },

  // --- Divers ---
  star: { component: FaStar, label: "Star" },
  trophy: { component: FaTrophy, label: "Trophée" },
  location: { component: FaMapMarkerAlt, label: "Lieu" },
  world: { component: FaGlobe, label: "International" },
};

// Fonction helper pour récupérer l'icône
export const getIconComponent = (iconName) => {
  const iconData = iconLibrary[iconName];
  return iconData ? iconData.component : FaStar; // Étoile par défaut si non trouvé
};