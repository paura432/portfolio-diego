'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getPhotoEvent } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import EventGallery from '@/components/photography/EventGallery';
import { getTranslations } from '@/lib/i18n';

export default function FotoReportageEventPage() {
  const { language } = useTheme();
  const params = useParams();
  const id = params.id as string;
  const t = getTranslations(language);
  
  const event = getPhotoEvent('fotoReportages', id, language);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-2xl mb-4">Evento no encontrado</h1>
        <Link href="/photography/foto-reportages" className="text-primary-600 dark:text-primary-400">
          Volver a foto-reportajes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
      <Link
        href="/photography/foto-reportages"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t.photography.backTo} {t.photography.fotoReportages}
      </Link>

      <div className="mb-8 sm:mb-12">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-3 sm:mb-4 text-gray-900 dark:text-white">
          {event.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-400">
          <span>{event.place}</span>
          {event.date && (
            <>
              <span>•</span>
              <span>{event.date}</span>
            </>
          )}
        </div>
      </div>

      <EventGallery photos={event.photos} eventPlace={event.place} />
    </div>
  );
}
