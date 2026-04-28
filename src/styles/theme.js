//kevyamon/portfolio/src/styles/theme.js
const theme = {
  colors: {
    primary: '#10b981', 
    background: '#0a0a0a', 
    surface: '#171717', 
    text: '#ffffff',
    textMuted: '#a3a3a3',
    border: '#262626',
    error: '#ef4444',
    success: '#22c55e'
  },
  patterns: {
    background: `
      radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)
    `,
    backgroundSize: '40px 40px'
  },
  transitions: {
    fast: '0.2s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out'
  }
};

export const applyTheme = () => {
  const root = document.documentElement;
  
  // Appliquer les couleurs
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Appliquer les patterns
  root.style.setProperty('--bg-pattern', theme.patterns.background);
  root.style.setProperty('--bg-pattern-size', theme.patterns.backgroundSize);
  
  // Appliquer les transitions
  Object.entries(theme.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value);
  });
};

export default theme;