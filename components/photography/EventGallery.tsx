'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/content';
import PhotoModal from './PhotoModal';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

interface EventGalleryProps {
  photos: Photo[];
  eventPlace?: string;
}

type ViewMode = 'list' | 'grid';

type GalleryItem =
  | { type: 'horizontal'; photo: Photo }
  | { type: 'vertical-pair'; photos: [Photo, Photo] }
  | { type: 'vertical-single'; photo: Photo };

function buildGalleryItems(photos: Photo[]): GalleryItem[] {
  const verticals: Photo[] = [];
  const horizontals: Photo[] = [];
  for (const p of photos) {
    if (p.orientation === 'vertical') {
      verticals.push(p);
    } else {
      horizontals.push(p);
    }
  }
  const items: GalleryItem[] = [];
  for (let i = 0; i < verticals.length; i += 2) {
    if (i + 1 < verticals.length) {
      items.push({ type: 'vertical-pair', photos: [verticals[i], verticals[i + 1]] });
    } else {
      items.push({ type: 'vertical-single', photo: verticals[i] });
    }
  }
  for (const h of horizontals) {
    items.push({ type: 'horizontal', photo: h });
  }
  return items;
}

/**
 * Galería: horizontales a ancho completo, verticales en pares lado a lado
 * Con toggle para vista lista (1 por fila) o cuadrícula (4 por fila)
 */
export default function EventGallery({ photos, eventPlace }: EventGalleryProps) {
  const { language } = useTheme();
  const t = getTranslations(language);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = buildGalleryItems(photos);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const currentIndex = selectedPhoto ? photos.findIndex((p) => p.id === selectedPhoto.id) : -1;
  const handlePrev = () => {
    if (currentIndex > 0) setSelectedPhoto(photos[currentIndex - 1]);
  };
  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < photos.length - 1) setSelectedPhoto(photos[currentIndex + 1]);
  };

  return (
    <>
      {/* Toggle de vista debajo del nombre del álbum */}
      <div className="flex gap-2 mb-6 md:mb-8">
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'list'
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {t.photography.viewList}
        </button>
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'grid'
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {t.photography.viewGrid}
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo, index) => (
            <GalleryPhotoItem
              key={photo.id}
              photo={photo}
              index={index}
              layout="grid"
              onClick={() => handlePhotoClick(photo)}
            />
          ))}
        </div>
      ) : (
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {items.map((item, index) => {
          if (item.type === 'horizontal') {
            return (
              <GalleryPhotoItem
                key={item.photo.id}
                photo={item.photo}
                index={index}
                layout="horizontal"
                onClick={() => handlePhotoClick(item.photo)}
              />
            );
          }
          if (item.type === 'vertical-single') {
            return (
              <div key={item.photo.id} className="flex justify-center">
                <div className="w-full max-w-[420px]">
                  <GalleryPhotoItem
                    photo={item.photo}
                    index={index}
                    layout="vertical"
                    onClick={() => handlePhotoClick(item.photo)}
                  />
                </div>
              </div>
            );
          }
          return (
            <div key={item.photos[0].id + '-' + item.photos[1].id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <GalleryPhotoItem
                photo={item.photos[0]}
                index={index}
                layout="vertical"
                onClick={() => handlePhotoClick(item.photos[0])}
              />
              <GalleryPhotoItem
                photo={item.photos[1]}
                index={index + 1}
                layout="vertical"
                onClick={() => handlePhotoClick(item.photos[1])}
              />
            </div>
          );
        })}
      </div>
      )}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        place={eventPlace}
        photos={photos}
        currentIndex={currentIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}

// Componente para cada foto en la galería
function GalleryPhotoItem({
  photo,
  index,
  layout,
  onClick,
}: {
  photo: Photo;
  index: number;
  layout: 'horizontal' | 'vertical' | 'grid';
  onClick: () => void;
}) {
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
        threshold: 0.05,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const hasDimensions = photo.width != null && photo.height != null;
  const isHorizontal = layout === 'horizontal';
  const isGrid = layout === 'grid';

  return (
    <article
      ref={photoRef}
      onClick={onClick}
      style={{ zIndex: 1000 - index }}
      className={`group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-md sm:rounded-lg transition-all duration-700 ease-out cursor-pointer hover:shadow-xl w-full ${
        isGrid
          ? 'aspect-square min-h-[120px]'
          : hasDimensions
            ? 'flex justify-center min-h-[200px]'
            : isHorizontal
              ? 'aspect-[4/3] min-h-[240px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[500px]'
              : 'aspect-[3/4] min-h-[280px] sm:min-h-[360px] md:min-h-[420px] max-w-full'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
    >
      {isGrid ? (
        <>
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            quality={90}
            className="transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-[1.02] object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300">
            <p className="text-white text-xs font-medium line-clamp-2">{photo.caption}</p>
          </div>
        </>
      ) : hasDimensions ? (
        <div className="relative w-fit max-w-full mx-auto">
          <Image
            src={photo.src}
            alt={photo.caption}
            width={photo.width}
            height={photo.height}
            quality={95}
            className="w-full h-auto max-w-full block transition-transform duration-500 ease-out group-hover:scale-[1.02] group-active:scale-[1.01]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 1280px, 1536px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 rounded-md sm:rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300">
            <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{photo.caption}</p>
          </div>
        </div>
      ) : (
        <>
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            quality={95}
            className={`transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-[1.02] ${isHorizontal ? 'object-cover' : 'object-contain'}`}
            sizes={isHorizontal ? '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 1280px, 1536px' : '(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 768px'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300">
            <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{photo.caption}</p>
          </div>
        </>
      )}
    </article>
  );
}
