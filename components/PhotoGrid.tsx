'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/content';
import PhotoModal from './photography/PhotoModal';

interface PhotoGridProps {
  photos: Photo[];
}

/**
 * Componente PhotoGrid: Grid visual mejorado para fotografías
 * Las fotos aparecen gradualmente al hacer scroll y son clickeables para ver en grande
 */
export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {photos.map((photo) => (
          <PhotoGridItem 
            key={photo.id} 
            photo={photo}
            onClick={() => handlePhotoClick(photo)}
          />
        ))}
      </div>
      <PhotoModal 
        photo={selectedPhoto} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </>
  );
}

// Componente para cada foto del grid con efecto de aparición
function PhotoGridItem({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const photoRef = useRef<HTMLElement | null>(null);

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
    <figure 
      ref={photoRef}
      className={`group space-y-4 transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
          <div 
            onClick={onClick}
            className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="font-medium text-lg mb-1">{photo.caption}</p>
              <p className="text-sm text-gray-200">{photo.place}</p>
            </div>
          </div>
          <figcaption className="text-sm text-gray-600 dark:text-gray-400 space-y-1 md:hidden">
            <p className="font-medium">{photo.caption}</p>
            <p className="text-gray-500 dark:text-gray-500">{photo.place}</p>
          </figcaption>
    </figure>
  );
}
