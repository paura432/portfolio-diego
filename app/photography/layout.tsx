'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const { language } = useTheme();
  const photography = getPhotography(language);
  const t = getTranslations(language);
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  // Ocultar hero cuando estamos dentro de un álbum (ej: /photography/conciertos/vanesa-martin)
  const isAlbumDetail = /^\/photography\/[^/]+\/[^/]+$/.test(pathname);

  // Al entrar en un álbum, hacer scroll al inicio del contenido (evita que suba al hero)
  useEffect(() => {
    if (isAlbumDetail) {
      window.scrollTo(0, 0);
    }
  }, [isAlbumDetail]);

  // Opacidad del hero sin setState en scroll (evita re-renders y mejora LCP/INP)
  useEffect(() => {
    if (isAlbumDetail) return;
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const hero = heroRef.current;
        const text = heroTextRef.current;
        if (!hero || !text) return;
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        text.style.opacity = String(Math.max(0, 1 - scrollY / (heroHeight * 0.5)));
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAlbumDetail]);

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20 bg-gray-50 dark:bg-black">
        {/* Hero Section - oculto dentro de un álbum para mostrar las fotos directamente */}
        {!isAlbumDetail && (
        <section
          ref={heroRef}
          className="relative bg-gradient-to-br from-primary-100 via-gray-50 to-accent-50 dark:from-black dark:via-gray-900 dark:to-black py-12 sm:py-16 md:py-20 min-h-[40vh] sm:min-h-[50vh] flex items-center"
        >
          <Section className="relative z-10 w-full">
            <div
              ref={heroTextRef}
              className="max-w-3xl transition-opacity duration-300"
            >
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-gray-900 dark:text-white">
                {t.photography.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-10">
                {photography.intro}
              </p>
              <PhotographySelector
                conciertosLabel={t.photography.conciertos}
                carrerasLabel={t.photography.carreras}
                coberturasLabel={t.photography.coberturas}
              />
            </div>
          </Section>
        </section>
        )}

        {/* Contenido de la categoría (conciertos, carreras, coberturas) o álbum */}
        <div className="w-full min-w-0 bg-white dark:bg-black">{children}</div>
      </main>
      <Footer />
    </>
  );
}
