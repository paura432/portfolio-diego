'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import ReportsSelector from '@/components/reports/ReportsSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useTheme();
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
      <main className="pt-16 sm:pt-20 bg-gray-50 dark:bg-black">
        {/* Hero Section - mismo estilo que Fotografía */}
        <section
          ref={heroRef}
          className="relative bg-gradient-to-br from-primary-100 via-gray-50 to-accent-50 dark:from-black dark:via-gray-900 dark:to-black py-12 sm:py-16 md:py-20 min-h-[40vh] sm:min-h-[50vh] flex items-center"
        >
          <Section className="relative z-10 w-full">
            <div
              className="max-w-3xl transition-opacity duration-300"
              style={{ opacity: getTextOpacity() }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 dark:text-white">
                {t.reports.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-10">
                {t.reports.subtitle}
              </p>
              <ReportsSelector tfgLabel={t.reports.tfg} />
            </div>
          </Section>
        </section>

        {/* Contenido TFG */}
        <div className="bg-white dark:bg-black">{children}</div>
      </main>
      <Footer />
    </>
  );
}
