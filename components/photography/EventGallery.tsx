'use client';

import {
  useMemo,
  useState,
  useCallback,
  startTransition,
  memo,
  type KeyboardEvent,
} from 'react';
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

/** Construye items manteniendo el orden original del array de fotos */
function buildGalleryItems(photos: Photo[]): GalleryItem[] {
  const items: GalleryItem[] = [];
  let i = 0;
  while (i < photos.length) {
    const p = photos[i];
    if (p.orientation === 'vertical') {
      if (i + 1 < photos.length && photos[i + 1].orientation === 'vertical') {
        items.push({ type: 'vertical-pair', photos: [p, photos[i + 1]] });
        i += 2;
      } else {
        items.push({ type: 'vertical-single', photo: p });
        i += 1;
      }
    } else {
      items.push({ type: 'horizontal', photo: p });
      i += 1;
    }
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
  const items = useMemo(() => buildGalleryItems(photos), [photos]);

  const handlePhotoClick = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  }, []);

  const currentIndex = selectedPhoto ? photos.findIndex((p) => p.id === selectedPhoto.id) : -1;
  const handlePrev = useCallback(() => {
    setSelectedPhoto((prev) => {
      if (!prev) return null;
      const idx = photos.findIndex((p) => p.id === prev.id);
      if (idx > 0) return photos[idx - 1];
      return prev;
    });
  }, [photos]);
  const handleNext = useCallback(() => {
    setSelectedPhoto((prev) => {
      if (!prev) return null;
      const idx = photos.findIndex((p) => p.id === prev.id);
      if (idx >= 0 && idx < photos.length - 1) return photos[idx + 1];
      return prev;
    });
  }, [photos]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        <button
          type="button"
          onClick={() => startTransition(() => setViewMode('list'))}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
            viewMode === 'list'
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {t.photography.viewList}
        </button>
        <button
          type="button"
          onClick={() => startTransition(() => setViewMode('grid'))}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
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
              layout="grid"
              imageLoading={index < 4 ? 'eager' : 'lazy'}
              lcpPriority={index === 0}
              onActivate={handlePhotoClick}
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
                  layout="horizontal"
                  imageLoading={index < 2 ? 'eager' : 'lazy'}
                  lcpPriority={index === 0}
                  onActivate={handlePhotoClick}
                />
              );
            }
            if (item.type === 'vertical-single') {
              return (
                <div key={item.photo.id} className="flex justify-center w-full min-w-0">
                  <div className="w-full max-w-[420px] min-w-0">
                    <GalleryPhotoItem
                      photo={item.photo}
                      layout="vertical"
                      imageLoading={index < 2 ? 'eager' : 'lazy'}
                      lcpPriority={index === 0}
                      onActivate={handlePhotoClick}
                    />
                  </div>
                </div>
              );
            }
            return (
              <div
                key={item.photos[0].id + '-' + item.photos[1].id}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0"
              >
                <GalleryPhotoItem
                  photo={item.photos[0]}
                  layout="vertical"
                  imageLoading={index < 2 ? 'eager' : 'lazy'}
                  lcpPriority={index === 0}
                  onActivate={handlePhotoClick}
                />
                <GalleryPhotoItem
                  photo={item.photos[1]}
                  layout="vertical"
                  imageLoading={index < 2 ? 'eager' : 'lazy'}
                  lcpPriority={false}
                  onActivate={handlePhotoClick}
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

type GalleryPhotoItemProps = {
  photo: Photo;
  layout: 'horizontal' | 'vertical' | 'grid';
  imageLoading: 'eager' | 'lazy';
  /** Primera foto visible: priority + preload para LCP (aviso de Next/Image) */
  lcpPriority?: boolean;
  onActivate: (photo: Photo) => void;
};

const GalleryPhotoItem = memo(function GalleryPhotoItem({
  photo,
  layout,
  imageLoading,
  lcpPriority = false,
  onActivate,
}: GalleryPhotoItemProps) {
  const handleClick = useCallback(() => {
    onActivate(photo);
  }, [onActivate, photo]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate(photo);
      }
    },
    [onActivate, photo]
  );

  const hasDimensions = photo.width != null && photo.height != null;
  const isHorizontal = layout === 'horizontal';
  const isGrid = layout === 'grid';

  const imgCommon = {
    decoding: 'async' as const,
    loading: imageLoading,
    fetchPriority: (lcpPriority || imageLoading === 'eager' ? 'high' : 'auto') as
      | 'high'
      | 'auto',
    ...(lcpPriority ? ({ priority: true } as const) : {}),
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={photo.caption}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`cv-auto group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-md sm:rounded-lg cursor-pointer hover:shadow-xl w-full min-w-0 transition-[box-shadow] duration-200 ${
        isGrid
          ? 'aspect-square min-h-[120px]'
          : hasDimensions
            ? 'flex justify-center min-h-[200px]'
            : isHorizontal
              ? 'aspect-[4/3] min-h-[240px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[500px]'
              : 'aspect-[3/4] min-h-[280px] sm:min-h-[360px] md:min-h-[420px] max-w-full'
      }`}
    >
      {isGrid ? (
        <>
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            quality={68}
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] group-active:scale-[1.01]"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            {...imgCommon}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-2 sm:p-3 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-150">
            <p className="text-white text-xs font-medium line-clamp-2">{photo.caption}</p>
          </div>
        </>
      ) : hasDimensions ? (
        <div className="relative w-fit max-w-full mx-auto">
          <Image
            src={photo.src}
            alt={photo.caption}
            width={photo.width!}
            height={photo.height!}
            quality={75}
            className="w-full h-auto max-w-full block transition-transform duration-200 ease-out group-hover:scale-[1.01]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 1280px, 1536px"
            {...imgCommon}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-md sm:rounded-lg" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-150">
            <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{photo.caption}</p>
          </div>
        </div>
      ) : (
        <>
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            quality={75}
            className={`transition-transform duration-200 ease-out group-hover:scale-[1.02] group-active:scale-[1.01] ${
              isHorizontal ? 'object-cover' : 'object-contain'
            }`}
            sizes={
              isHorizontal
                ? '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 1280px, 1536px'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 768px'
            }
            {...imgCommon}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-150">
            <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{photo.caption}</p>
          </div>
        </>
      )}
    </article>
  );
});
