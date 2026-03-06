'use client';

import { PhotoEvent } from '@/types/content';
import EventCover from './EventCover';

interface PhotoCategoryProps {
  title: string;
  events: PhotoEvent[];
  category: string; // 'conciertos', 'carreras', 'foto-reportages', 'coberturas'
}

/**
 * Subcomponente para mostrar una categoría de eventos fotográficos
 * Muestra portadas de eventos que al hacer clic llevan a la galería completa
 */
export default function PhotoCategory({ title, events, category }: PhotoCategoryProps) {
  return (
    <section>
      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-gray-900 dark:text-white mb-6 sm:mb-8 md:mb-10 tracking-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {events.map((event) => (
          <EventCover 
            key={event.id} 
            event={event}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}

