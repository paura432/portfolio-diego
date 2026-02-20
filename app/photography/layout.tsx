'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import PhotographySelector from '@/components/photography/PhotographySelector';
import { getPhotography } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useTheme();
  const photography = getPhotography(language);
  const t = getTranslations(language);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTextOpacity = () => {
    if (!heroRef.current) return 1;
    const heroHeight = heroRef.current.offsetHeight;
    return Math.max(0, 1 - scrollY / (heroHeight * 0.5));
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-black">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative bg-gradient-to-br from-primary-100 via-gray-50 to-accent-50 dark:from-black dark:via-gray-900 dark:to-black py-20 min-h-[50vh] flex items-center"
        >
          <Section className="relative z-10 w-full">
            <div
              className="max-w-3xl transition-opacity duration-300"
              style={{ opacity: getTextOpacity() }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-normal mb-6 text-gray-900 dark:text-white">
                {t.photography.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
                {photography.intro}
              </p>
              <PhotographySelector
                conciertosLabel={t.photography.conciertos}
                carrerasLabel={t.photography.carreras}
                fotoReportagesLabel={t.photography.fotoReportages}
                coberturasLabel={t.photography.coberturas}
              />
            </div>
          </Section>
        </section>

        {/* Contenido de la categoría (conciertos o carreras) */}
        <div className="bg-white dark:bg-black">{children}</div>
      </main>
      <Footer />
    </>
  );
}
