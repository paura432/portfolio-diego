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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl font-normal mb-4">
              {t.footer.contact}
            </h3>
            <a
              href={`mailto:${contact.email}`}
              className="text-primary-200 dark:text-gray-300 hover:text-white transition-colors text-base"
            >
              {contact.email}
            </a>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-serif text-xl font-normal mb-4">
              {t.footer.socials}
            </h3>
            <ul className="space-y-2">
              {Object.entries(contact.socials).map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-200 dark:text-gray-300 hover:text-white transition-colors text-base"
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-serif text-xl font-normal mb-4">
              {t.footer.location}
            </h3>
            <p className="text-primary-200 dark:text-gray-300 text-base">
              {siteInfo.location}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary-700 dark:border-gray-800 text-sm text-primary-300 dark:text-gray-400">
          <p>
            &copy; {currentYear} {siteInfo.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
