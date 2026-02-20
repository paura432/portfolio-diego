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
 * Las fotos aparecen gradualmente al hacer scroll
 */
export default function PhotoCategory({ title, photos }: PhotoCategoryProps) {
  return (
    <section>
      <h2 className="font-serif text-2xl md:text-3xl font-normal text-gray-900 dark:text-white mb-10 tracking-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {photos.map((photo, index) => (
          <PhotoItem key={photo.id} photo={photo} index={index} />
        ))}
      </div>
    </section>
  );
}

// Componente para cada foto con efecto de aparición
function PhotoItem({ photo, index }: { photo: Photo; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const photoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = photoRef.current;
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
    <article
      ref={photoRef}
      className={`group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-sm transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        aspectRatio: index % 3 === 0 ? '4/5' : '4/3',
        minHeight: '400px',
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
  );
}
