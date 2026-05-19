//kevyamon/portfolio/src/styles/theme.js

const themes = {
  dark: {
    primary: '#0055ff', // Bleu électrique professionnel
    primaryRgb: '0, 85, 255',
    background: '#0a0c10', // Noir/Bleu très foncé
    surface: '#11141b', // Surface sombre
    text: '#ffffff',
    textMuted: '#8b95a5',
    border: 'rgba(0, 85, 255, 0.15)',
    error: '#ef4444',
    success: '#22c55e',
    gridPattern: 'rgba(0, 85, 255, 0.08)',
    contrastBg: '#FAF7F0', // Crème/Ivoire pour les cartes de compétences
    contrastText: '#0a0c10'
  },
  light: {
    primary: '#0047ff', // Bleu électrique légèrement plus contrasté
    primaryRgb: '0, 71, 255',
    background: '#FAF9F6', // Crème/Ivoire clair
    surface: '#f3f2ec', // Surface claire
    text: '#0a0c10',
    textMuted: '#5c6470',
    border: 'rgba(0, 71, 255, 0.12)',
    error: '#dc2626',
    success: '#16a34a',
    gridPattern: 'rgba(0, 71, 255, 0.05)',
    contrastBg: '#0a0c10', // Noir pour les cartes de compétences en mode clair
    contrastText: '#ffffff'
  }
};

const patterns = {
  dark: 'linear-gradient(to right, rgba(0, 85, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 85, 255, 0.08) 1px, transparent 1px)',
  light: 'linear-gradient(to right, rgba(0, 71, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 71, 255, 0.05) 1px, transparent 1px)',
  backgroundSize: '40px 40px'
};

const transitions = {
  fast: '0.2s ease-in-out',
  normal: '0.3s ease-in-out',
  slow: '0.5s ease-in-out'
};

export const applyTheme = (mode = 'dark') => {
  const root = document.documentElement;
  const currentTheme = themes[mode] || themes.dark;
  
  root.setAttribute('data-theme', mode);
  
  // Appliquer les couleurs
  Object.entries(currentTheme).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Appliquer les patterns
  const pattern = patterns[mode] || patterns.dark;
  root.style.setProperty('--bg-pattern', pattern);
  root.style.setProperty('--bg-pattern-size', patterns.backgroundSize);
  
  // Appliquer les transitions
  Object.entries(transitions).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value);
  });
};

export default themes;