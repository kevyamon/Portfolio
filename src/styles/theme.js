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
      radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.04) 1px, transparent 0),
      radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
      linear-gradient(to right, rgba(255, 255, 255, 0.01) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
    `,
    backgroundSize: '32px 32px, 100% 100%, 100% 100%, 128px 128px, 128px 128px'
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