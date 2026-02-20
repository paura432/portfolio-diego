'use client';

import { Report } from '@/types/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';
import Image from 'next/image';

interface ArticleCardProps {
  report: Report;
}

/**
 * Componente ArticleCard: Tarjeta visual mejorada para reportajes
 * Con imagen destacada y mejor diseño
 */
export default function ArticleCard({ report }: ArticleCardProps) {
  const { language } = useTheme();
  const t = getTranslations(language);

  // Imagen placeholder diferente para cada reportaje
  const imageMap: { [key: string]: string } = {
    '1': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    '2': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
    '3': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    '4': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    '5': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
  };

  const imageUrl = imageMap[report.id] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';

  return (
    <article className="max-w-4xl">
      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Imagen */}
        <div className="md:col-span-1">
          <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <Image
              src={imageUrl}
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
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-gray-900 dark:text-gray-100 leading-tight hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
            {report.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg max-w-3xl">
            {report.summary}
          </p>
          {report.url && report.url !== '#' && (
            <a
              href={report.url}
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
