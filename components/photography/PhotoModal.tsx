'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/content';

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal para mostrar una foto en grande con su pie de foto
 */
export default function PhotoModal({ photo, isOpen, onClose }: PhotoModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Botón de cerrar */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-3 sm:p-2 -m-1 sm:m-0 text-white hover:text-gray-300 active:text-gray-400 transition-colors touch-manipulation"
        aria-label="Cerrar"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Contenedor de la imagen - evita que el click cierre el modal */}
      <div
        className="relative max-w-[95vw] max-h-[95vh] w-full mx-2 sm:mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen */}
        <div className="relative w-full flex-1 flex items-center justify-center bg-black rounded-t-lg overflow-hidden">
          <div className="relative w-full h-full min-h-[50vh] sm:min-h-[60vh] max-h-[85vh]">
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              quality={95}
              className="object-contain"
              sizes="(max-width: 1024px) 95vw, 1536px"
              priority
            />
          </div>
        </div>

        {/* Pie de foto */}
        <div className="bg-white dark:bg-gray-900 px-4 sm:px-6 py-3 sm:py-4 rounded-b-lg border-t border-gray-200 dark:border-gray-800">
          <h3 className="font-serif text-base sm:text-xl md:text-2xl font-normal text-gray-900 dark:text-white mb-1 sm:mb-2">
            {photo.caption}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {photo.place}
          </p>
        </div>
      </div>
    </div>
  );
}
