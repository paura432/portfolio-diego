'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Image from 'next/image';
import { getPhotography } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

/**
 * Página Fotografía: Galería visual estilo Adobe Portfolio
 * Con efecto de texto que desaparece al hacer scroll
 */
export default function PhotographyPage() {
  const { language } = useTheme();
  const photography = getPhotography(language);
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
      <main className="bg-gray-50 dark:bg-black">
        {/* Hero Section con texto que desaparece */}
        <section 
          ref={heroRef}
          className="relative bg-gradient-to-br from-primary-100 via-gray-50 to-accent-50 dark:from-black dark:via-gray-900 dark:to-black py-20 min-h-[60vh] flex items-center"
        >
          <Section className="relative z-10">
            <div 
              className="max-w-3xl transition-opacity duration-300"
              style={{ opacity: textOpacity }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-normal mb-6 text-gray-900 dark:text-white">
                {t.photography.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {photography.intro}
              </p>
            </div>
          </Section>
        </section>

        {/* Gallery Section - Grid estilo Adobe Portfolio con imágenes grandes */}
        <div className="bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {photography.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer"
                  style={{
                    aspectRatio: index % 3 === 0 ? '4/5' : '4/3',
                    minHeight: '500px'
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay con información siempre visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h3 className="font-serif text-2xl md:text-3xl font-normal text-white mb-2">
                      {photo.caption}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      {photo.place}
                    </p>
                  </div>

                  {/* Overlay adicional al hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
