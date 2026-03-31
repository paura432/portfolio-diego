'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PhotoEvent } from '@/types/content';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

interface EventCoverProps {
  event: PhotoEvent;
  category: string; // 'conciertos', 'carreras', 'coberturas'
  /** Carga antes las portadas visibles al inicio (mejor LCP) */
  priority?: boolean;
}

/**
 * Componente para mostrar la portada de un evento
 * Al hacer clic, lleva a la página del evento con todas sus fotos
 */
export default function EventCover({ event, category, priority = false }: EventCoverProps) {
  const { language } = useTheme();
  const t = getTranslations(language);

  const href = `/photography/${category}/${event.id}`;

  return (
    <Link href={href} scroll={false}>
      <div
        className="cv-auto group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-lg transition-[box-shadow,transform] duration-200 ease-out cursor-pointer hover:shadow-2xl min-h-[240px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[400px]"
        style={{ aspectRatio: '4/3' }}
      >
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
          quality={80}
          priority={priority}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white mb-1 sm:mb-2 leading-tight break-words hyphens-auto">
            {event.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span>{event.place}</span>
            {event.date && (
              <>
                <span>•</span>
                <span>{event.date}</span>
              </>
            )}
            <span>•</span>
            <span>{event.photos.length} {event.photos.length === 1 ? t.photography.photo : t.photography.photos}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
