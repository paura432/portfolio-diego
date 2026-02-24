'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/content';
import PhotoModal from './PhotoModal';

interface EventGalleryProps {
  photos: Photo[];
}

/**
 * Componente para mostrar todas las fotos de un evento en cascada
 * Las fotos aparecen gradualmente al hacer scroll y son clickeables
 */
export default function EventGallery({ photos }: EventGalleryProps) {
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
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8">
        {photos.map((photo, index) => (
          <GalleryPhotoItem
            key={photo.id}
            photo={photo}
            index={index}
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

// Componente para cada foto en la galería
function GalleryPhotoItem({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
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

  // Variar el tamaño de las fotos para crear efecto cascada
  const getAspectRatio = () => {
    const ratios = ['4/3', '3/4', '16/9', '4/5', '5/4'];
    return ratios[index % ratios.length];
  };

  return (
    <article
      ref={photoRef}
      onClick={onClick}
      className={`group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-lg transition-all duration-700 ease-out cursor-pointer hover:shadow-xl mb-6 md:mb-8 break-inside-avoid ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        aspectRatio: getAspectRatio(),
        minHeight: '400px',
      }}
    >
      <Image
        src={photo.src}
        alt={photo.caption}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-sm font-medium line-clamp-2">{photo.caption}</p>
      </div>
    </article>
  );
}
