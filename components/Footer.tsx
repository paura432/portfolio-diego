'use client';

import { getContact, getSiteInfo } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

/**
 * Componente Footer: Footer visual mejorado con colores
 */
export default function Footer() {
  const { language } = useTheme();
  const contact = getContact(language);
  const siteInfo = getSiteInfo(language);
  const t = getTranslations(language);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary-800 to-primary-900 dark:from-black dark:to-gray-900 text-white mt-24 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-normal mb-3 sm:mb-4">
              {t.footer.contact}
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-primary-200 dark:text-gray-300">
              <li>
                <a
                  href={`tel:${contact.phone?.replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors text-sm sm:text-base"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white transition-colors text-sm sm:text-base break-all sm:break-normal"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.socials.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-sm sm:text-base"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-normal mb-3 sm:mb-4">
              {t.footer.socials}
            </h3>
            <ul className="space-y-2">
              {Object.entries(contact.socials)
                .filter(([platform]) => platform !== 'LinkedIn')
                .map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-200 dark:text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-lg sm:text-xl font-normal mb-3 sm:mb-4">
              {t.footer.location}
            </h3>
            <p className="text-primary-200 dark:text-gray-300 text-sm sm:text-base">
              {siteInfo.location}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-primary-700 dark:border-gray-800 text-xs sm:text-sm text-primary-300 dark:text-gray-400 text-center sm:text-left">
          <p>
            &copy; {currentYear} {siteInfo.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
