'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { getWork } from '@/lib/content';
import type { WorkSubEntry } from '@/types/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

/**
 * Página Vida laboral: Timeline visual mejorado
 * Con efecto de texto que desaparece al hacer scroll
 */
export default function WorkPage() {
  const { language } = useTheme();
  const work = getWork(language);
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
      <main className="pt-16 sm:pt-20 bg-gray-50 dark:bg-black">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="bg-gradient-to-br from-primary-100 via-gray-50 to-accent-50 dark:from-black dark:via-gray-900 dark:to-black py-12 sm:py-16 md:py-20 min-h-[40vh] sm:min-h-[50vh] flex items-center"
        >
          <Section>
            <h1 
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 text-gray-900 dark:text-white transition-opacity duration-300"
              style={{ opacity: textOpacity }}
            >
              {t.work.title}
            </h1>
          </Section>
        </section>

        {/* Timeline en dos columnas tipo folio: ancho completo */}
        <div className="w-full bg-white dark:bg-black py-12 sm:py-16 lg:py-20 min-h-screen">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-start">
            {/* Columna izquierda: primera mitad */}
            <div className="relative space-y-12 lg:pl-6">
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-0.5 min-h-full bg-gradient-to-b from-primary-300 via-accent-300 to-primary-300 dark:from-primary-600 dark:via-accent-600 dark:to-primary-600" />
              {work.slice(0, Math.ceil(work.length / 2)).map((item) => (
                <WorkItem key={item.id} item={item} />
              ))}
            </div>
            {/* Columna derecha: el resto */}
            <div className="relative space-y-12 lg:pl-6">
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-0.5 min-h-full bg-gradient-to-b from-primary-300 via-accent-300 to-primary-300 dark:from-primary-600 dark:via-accent-600 dark:to-primary-600" />
              {work.slice(Math.ceil(work.length / 2)).map((item) => (
                <WorkItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Componente para cada item de trabajo con efecto de aparición
function WorkItem({ item }: { item: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div 
      ref={itemRef}
      className={`relative transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Timeline Dot */}
      <div className="absolute -left-6 top-2 w-4 h-4 bg-accent-500 dark:bg-accent-400 rounded-full border-4 border-white dark:border-gray-800 shadow-lg hidden lg:block -translate-x-1/2" />
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
        {item.subEntries ? (
          <div className="space-y-6">
            {item.subEntries.map((sub: WorkSubEntry, i: number) => (
              <div key={i}>
                <div className="mb-2">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full text-xs font-medium">
                    {sub.dates}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mb-1 text-gray-900 dark:text-gray-100">
                  {sub.role}
                </h2>
                <p className="text-xl text-primary-700 dark:text-primary-400">
                  {sub.organization}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-4">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full text-xs font-medium">
                {item.dates}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mb-2 text-gray-900 dark:text-gray-100">
              {item.role}
            </h2>
            <p className="text-xl text-primary-700 dark:text-primary-400 mb-4 font-medium">
              {item.organization}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              {item.description}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
