//src/hooks/useServerWakeup.js
import { useState, useEffect, useCallback, useRef } from 'react';
import apiClient from '../api/axiosConfig';

export const useServerWakeup = () => {
  const [status, setStatus] = useState('loading');
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const checkServer = useCallback(async () => {
    try {
      await apiClient.get('/');
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      setStatus('success');
    } catch (error) {
      if (error.response) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setStatus('success');
      }
    }
  }, []);

  const startWakingUp = useCallback(() => {
    setStatus('loading');
    
    checkServer();

    intervalRef.current = setInterval(checkServer, 5000);

    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setStatus('error');
    }, 120000);
  }, [checkServer]);

  useEffect(() => {
    startWakingUp();
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startWakingUp]);

  return { status, retry: startWakingUp };
};