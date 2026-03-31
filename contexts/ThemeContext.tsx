'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  startTransition,
  ReactNode,
} from 'react';

type Language = 'es' | 'en';

interface ThemeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  /** Evita que el primer persist sobrescriba localStorage antes de leer la preferencia guardada */
  const skipFirstLanguagePersist = useRef(true);

  const setLanguage = useCallback((lang: Language) => {
    startTransition(() => setLanguageState(lang));
  }, []);

  useEffect(() => {
    // Modo oscuro siempre activo
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    // Cargar preferencia sin startTransition para evitar flash de idioma al hidratar
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang === 'es' || savedLang === 'en') {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    if (skipFirstLanguagePersist.current) {
      skipFirstLanguagePersist.current = false;
      return;
    }
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
