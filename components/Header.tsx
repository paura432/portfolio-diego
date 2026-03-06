'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSiteInfo } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';
import LanguageToggle from './LanguageToggle';

/**
 * Componente Header: Navegación responsive con menú móvil
 */
export default function Header() {
  const pathname = usePathname();
  const { language } = useTheme();
  const siteInfo = getSiteInfo(language);
  const t = getTranslations(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/photography', label: t.nav.photography },
    { href: '/reports', label: t.nav.reports },
    { href: '/work', label: t.nav.work },
  ];

  const linkClass = (link: { href: string }) =>
    `block py-2 md:py-0 transition-colors underline-offset-4 ${
      pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
        ? 'text-primary-700 dark:text-primary-400 font-medium underline decoration-2 decoration-accent-500 dark:decoration-accent-400'
        : 'text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 hover:underline decoration-2 decoration-primary-300 dark:decoration-primary-600'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1100] bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo/Name */}
          <Link
            href="/"
            className="font-serif text-lg sm:text-xl font-normal text-gray-900 dark:text-gray-100 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
          >
            {siteInfo.name}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex gap-6 lg:gap-8 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass(link)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageToggle />
          </div>

          {/* Mobile: hamburger + language */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={linkClass(link)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
