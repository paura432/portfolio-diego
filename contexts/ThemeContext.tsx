'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface ThemeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Modo oscuro siempre activo
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    // Cargar preferencia de idioma guardada
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Manejar errores de extensiones del navegador (como MetaMask)
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Ignorar errores de extensiones del navegador como MetaMask
      if (
        event.message?.includes('MetaMask') ||
        event.message?.includes('Failed to connect') ||
        event.message?.includes('chrome-extension://') ||
        event.filename?.includes('chrome-extension://')
      ) {
        event.preventDefault();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.toString() || '';
      if (
        reason.includes('MetaMask') ||
        reason.includes('Failed to connect') ||
        reason.includes('chrome-extension://')
      ) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
