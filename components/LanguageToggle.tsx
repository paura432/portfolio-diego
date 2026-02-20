'use client';

import { useTheme } from '@/contexts/ThemeContext';

/**
 * Componente LanguageToggle: Selector de idioma
 */
export default function LanguageToggle() {
  const { language, setLanguage } = useTheme();

  return (
    <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          language === 'es'
            ? 'bg-primary-600 dark:bg-primary-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-primary-600 dark:bg-primary-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  );
}
