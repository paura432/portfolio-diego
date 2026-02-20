'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import ArticleCard from '@/components/ArticleCard';
import { getReports } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

/**
 * Página Reportajes: Listado visual de artículos y reportajes
 * Con efecto de texto que desaparece al hacer scroll
 */
export default function ReportsPage() {
  const { language } = useTheme();
  const reports = getReports(language);
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
      <main className="bg-white dark:bg-black">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="bg-gradient-to-br from-accent-100 via-gray-50 to-primary-50 dark:from-black dark:via-gray-900 dark:to-black py-20 min-h-[50vh] flex items-center"
        >
          <Section>
            <div 
              className="transition-opacity duration-300"
              style={{ opacity: textOpacity }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-normal mb-4 text-gray-900 dark:text-gray-100">
                {t.reports.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
                {t.reports.subtitle}
              </p>
            </div>
          </Section>
        </section>

        {/* Reports List */}
        <Section className="bg-white dark:bg-black">
          <div className="space-y-0">
            {reports.map((report, index) => (
              <div
                key={report.id}
                className={`py-12 border-b border-gray-200 dark:border-gray-800 last:border-b-0 ${
                  index % 2 === 0 
                    ? 'bg-white dark:bg-black' 
                    : 'bg-gray-50 dark:bg-gray-900'
                }`}
              >
                <ArticleCard report={report} />
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
