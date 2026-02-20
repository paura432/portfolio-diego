'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Image from 'next/image';
import { getSiteInfo, getAbout } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

/**
 * Página de inicio: Presentación visual y profesional
 * Con efecto de texto que desaparece al hacer scroll
 */
export default function Home() {
  const { language } = useTheme();
  const siteInfo = getSiteInfo(language);
  const about = getAbout(language);
  const t = getTranslations(language);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular opacidad del texto basado en scroll
  const getTextOpacity = () => {
    if (!heroRef.current) return 1;
    const heroHeight = heroRef.current.offsetHeight;
    const opacity = Math.max(0, 1 - scrollY / (heroHeight * 0.5));
    return opacity;
  };

  const textOpacity = getTextOpacity();

  return (
    <>
      <Header />
      <main>
        {/* Hero Section con fondo visual suave */}
        <section 
          ref={heroRef}
          className="relative bg-gradient-to-br from-primary-50 via-gray-50 to-accent-50 dark:from-black dark:via-gray-900 dark:to-black py-24 md:py-32 min-h-[80vh] flex items-center"
        >
          <div className="absolute inset-0 gradient-overlay"></div>
          <Section className="relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div 
                className="space-y-6 transition-opacity duration-300"
                style={{ opacity: textOpacity }}
              >
                <div>
                  <h1 className="font-serif text-5xl md:text-6xl font-normal mb-4 text-gray-900 dark:text-gray-100 leading-tight">
                    {siteInfo.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-primary-700 dark:text-primary-400 mb-2 font-medium">
                    {siteInfo.role}
                  </p>
                  <p className="text-primary-600 dark:text-primary-500 text-base">
                    {siteInfo.location}
                  </p>
                </div>

                <div className="pt-6 border-t border-primary-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {about.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {siteInfo.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-primary-200 dark:border-gray-700 rounded-full text-sm text-primary-700 dark:text-primary-400"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div 
                className="relative transition-opacity duration-300"
                style={{ opacity: textOpacity }}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop"
                    alt={siteInfo.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-400 dark:bg-accent-600 rounded-lg opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-400 dark:bg-primary-600 rounded-lg opacity-20"></div>
              </div>
            </div>
          </Section>
        </section>

        {/* Quick Links Section */}
        <Section className="bg-white dark:bg-black">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/photography"
              className="group p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-black rounded-lg hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-serif text-2xl mb-2 text-primary-900 dark:text-primary-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                {t.home.quickLinks.photography}
              </h3>
              <p className="text-primary-700 dark:text-primary-400 text-sm">
                {t.home.quickLinks.photographyDesc}
              </p>
            </a>
            <a
              href="/reports"
              className="group p-8 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-gray-900 dark:to-black rounded-lg hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-serif text-2xl mb-2 text-accent-900 dark:text-accent-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                {t.home.quickLinks.reports}
              </h3>
              <p className="text-accent-700 dark:text-accent-400 text-sm">
                {t.home.quickLinks.reportsDesc}
              </p>
            </a>
            <a
              href="/work"
              className="group p-8 bg-gradient-to-br from-warm-50 to-warm-100 dark:from-gray-900 dark:to-black rounded-lg hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-serif text-2xl mb-2 text-warm-900 dark:text-warm-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                {t.home.quickLinks.experience}
              </h3>
              <p className="text-warm-700 dark:text-warm-400 text-sm">
                {t.home.quickLinks.experienceDesc}
              </p>
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
