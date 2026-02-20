'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSiteInfo } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';
import LanguageToggle from './LanguageToggle';

/**
 * Componente Header: Navegación con controles de tema e idioma
 */
export default function Header() {
  const pathname = usePathname();
  const { language } = useTheme();
  const siteInfo = getSiteInfo(language);
  const t = getTranslations(language);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/photography', label: t.nav.photography },
    { href: '/reports', label: t.nav.reports },
    { href: '/work', label: t.nav.work },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo/Name */}
          <Link
            href="/"
            className="font-serif text-xl font-normal text-gray-900 dark:text-gray-100 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
          >
            {siteInfo.name}
          </Link>

          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <ul className="flex flex-wrap gap-6 md:gap-8 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative transition-colors underline-offset-4 ${
                      pathname === link.href ||
                      (link.href !== '/' && pathname.startsWith(link.href))
                        ? 'text-primary-700 dark:text-primary-400 font-medium underline decoration-2 decoration-accent-500 dark:decoration-accent-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 hover:underline decoration-2 decoration-primary-300 dark:decoration-primary-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Toggle */}
            <div className="flex items-center gap-2">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
