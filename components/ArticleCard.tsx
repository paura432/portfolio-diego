'use client';

import { useEffect, useRef, useState } from 'react';
import { Report } from '@/types/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';
import Image from 'next/image';

interface ArticleCardProps {
  report: Report;
  isFirst?: boolean;
}

/**
 * Componente ArticleCard: Tarjeta visual mejorada para reportajes
 * Con imagen destacada y mejor diseño
 * Los reportajes aparecen gradualmente al hacer scroll
 */
export default function ArticleCard({ report, isFirst = false }: ArticleCardProps) {
  const { language } = useTheme();
  const t = getTranslations(language);
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = articleRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Una vez visible, ya no necesitamos observar
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px', // Se activa un poco antes de que entre completamente
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const imageUrl = report.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
  
  // Codificar la URL si es local para manejar caracteres especiales como comillas tipográficas
  const encodedImageUrl = imageUrl.startsWith('/') 
    ? imageUrl.split('/').map((part, i) => i === 0 ? part : encodeURIComponent(part)).join('/')
    : imageUrl;

  return (
    <article
      ref={articleRef}
      className={`max-w-4xl transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Imagen */}
        <div className="md:col-span-1">
          <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <Image
              src={encodedImageUrl}
              alt={report.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Contenido */}
        <div className="md:col-span-2 space-y-4">
          <div className="mb-3 flex items-baseline gap-4 flex-wrap">
            <span className="px-4 py-1.5 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
              {report.medium}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{report.year}</span>
          </div>
          {report.url && report.url !== '#' ? (
            <a
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-gray-900 dark:text-gray-100 leading-tight hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer">
                {report.title}
              </h2>
            </a>
          ) : (
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-gray-900 dark:text-gray-100 leading-tight">
              {report.title}
            </h2>
          )}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg max-w-3xl">
            {report.summary}
          </p>
          {report.url && report.url !== '#' && (
            <a
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-700 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 font-medium transition-colors underline underline-offset-4 decoration-2"
            >
              {t.reports.readMore}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
