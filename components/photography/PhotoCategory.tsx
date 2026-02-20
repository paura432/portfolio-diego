'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/content';

interface PhotoCategoryProps {
  title: string;
  photos: Photo[];
}

/**
 * Subcomponente para mostrar una categoría de fotos (Conciertos o Carreras)
 * Las fotos se difuminan al hacer scroll hacia abajo
 */
export default function PhotoCategory({ title, photos }: PhotoCategoryProps) {
  const [blurValues, setBlurValues] = useState<number[]>(photos.map(() => 0));
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = refs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          const ratio = entry.intersectionRatio;
          setBlurValues((prev) => {
            const next = [...prev];
            next[index] = Math.round((1 - ratio) * 8);
            return next;
          });
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs, i) => {
        if (obs && refs.current[i]) obs.unobserve(refs.current[i]!);
      });
    };
  }, [photos.length]);

  return (
    <section>
      <h2 className="font-serif text-2xl md:text-3xl font-normal text-gray-900 dark:text-white mb-10 tracking-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {photos.map((photo, index) => (
          <article
            key={photo.id}
            ref={(el) => { refs.current[index] = el; }}
            className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-sm transition-[filter] duration-300"
            style={{
              aspectRatio: index % 3 === 0 ? '4/5' : '4/3',
              minHeight: '400px',
              filter: `blur(${blurValues[index] ?? 0}px)`,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="font-serif text-xl md:text-2xl font-normal text-white mb-1.5 leading-tight">
                {photo.caption}
              </h3>
              <p className="text-sm text-gray-300">{photo.place}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
