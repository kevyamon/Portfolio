//src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SocketProvider } from './context/SocketContext';
import { UIProvider } from './context/UIContext';
import { applyTheme } from './styles/theme';

// On applique nos variables CSS dynamiques au lancement
applyTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        {/* On enveloppe l'application avec notre gestionnaire d'UI global */}
        <UIProvider>
          <App />
        </UIProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);