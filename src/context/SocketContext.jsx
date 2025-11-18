// kevyamon/portfolio/src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

// Hook personnalisé pour utiliser le socket facilement dans n'importe quel composant
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connexion au backend
    const socketInstance = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('🟢 Connecté au serveur Socket.io');
    });

    // Nettoyage à la fermeture
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};