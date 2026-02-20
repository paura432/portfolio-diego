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
      <main className="bg-white dark:bg-black">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="bg-gradient-to-br from-accent-100 via-gray-50 to-primary-50 dark:from-black dark:via-gray-900 dark:to-black py-20 min-h-[50vh] flex items-center"
        >
          <Section className="relative z-10 w-full">
            <div
              className="max-w-3xl transition-opacity duration-300"
              style={{ opacity: getTextOpacity() }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-normal mb-6 text-gray-900 dark:text-white">
                {t.reports.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
                {t.reports.subtitle}
              </p>
              <ReportsSelector
                diarioAsLabel={t.reports.diarioAs}
                infoperiodistasLabel={t.reports.infoperiodistas}
                elGeneracionalLabel={t.reports.elGeneracional}
              />
            </div>
          </Section>
        </section>

        {/* Contenido del medio (diario-as, infoperiodistas o el-generacional) */}
        <div className="bg-white dark:bg-black">{children}</div>
      </main>
      <Footer />
    </>
  );
}
