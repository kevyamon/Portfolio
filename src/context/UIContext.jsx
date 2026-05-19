//kevyamon/portfolio/src/context/UIContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { applyTheme } from '../styles/theme';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  // Appliquer le thème dès le chargement de l'application
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', next);
      return next;
    });
  };

  return (
    <UIContext.Provider value={{ 
      isSidebarOpen, 
      toggleSidebar, 
      closeSidebar, 
      openSidebar, 
      theme, 
      toggleTheme 
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);