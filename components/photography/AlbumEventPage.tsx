'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import EventGallery from '@/components/photography/EventGallery';
import { getTranslations } from '@/lib/i18n';
import type { PhotoEvent } from '@/types/content';

export type AlbumCategory = 'conciertos' | 'carreras' | 'coberturas';

const listHref: Record<AlbumCategory, string> = {
  conciertos: '/photography/conciertos',
  carreras: '/photography/carreras',
  coberturas: '/photography/coberturas',
};

export default function AlbumEventPage({
  category,
  eventEs,
  eventEn,
}: {
  category: AlbumCategory;
  eventEs: PhotoEvent;
  eventEn: PhotoEvent;
}) {
  const { language } = useTheme();
  const t = getTranslations(language);
  const event = language === 'en' ? eventEn : eventEs;

  const categoryLabel =
    category === 'conciertos'
      ? t.photography.conciertos
      : category === 'carreras'
        ? t.photography.carreras
        : t.photography.coberturas;

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 overflow-x-hidden">
      <Link
        href={listHref[category]}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 sm:mb-8 transition-colors text-sm sm:text-base -mx-1 px-1 touch-manipulation"
        prefetch={true}
      >
        <svg
          className="w-5 h-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t.photography.backTo} {categoryLabel}
      </Link>

      <div className="mb-8 sm:mb-12 min-w-0">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-3 sm:mb-4 text-gray-900 dark:text-white break-words hyphens-auto">
          {event.title}
        </h1>
        {event.description && (
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl mb-4 break-words">
            {event.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-base sm:text-lg text-gray-600 dark:text-gray-400">
          <span>{event.place}</span>
          {event.date && (
            <>
              <span aria-hidden>•</span>
              <span>{event.date}</span>
            </>
          )}
        </div>
      </div>

      <EventGallery photos={event.photos} eventPlace={event.place} />
    </div>
  );
}
