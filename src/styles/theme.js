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
  transitions: {
    fast: '0.2s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out'
  }
};

export const applyTheme = () => {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  Object.entries(theme.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value);
  });
};

export default theme;