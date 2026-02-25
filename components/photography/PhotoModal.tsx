'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/content';

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  place?: string;
}

/**
 * Modal para mostrar una foto en grande con su pie de foto
 */
export default function PhotoModal({ photo, isOpen, onClose, place }: PhotoModalProps) {
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
      className="fixed inset-0 z-[100] flex flex-col bg-black"
      onClick={onClose}
    >
      {/* Botón de cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/90 hover:text-white transition-colors touch-manipulation"
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

      {/* Imagen a pantalla completa */}
      <div
        className="relative flex-1 w-full min-h-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.caption}
          fill
          quality={95}
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Pie de foto superpuesto en la parte inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent px-4 sm:px-6 py-6 sm:py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-base sm:text-xl md:text-2xl font-normal text-white mb-1">
          {photo.caption}
        </h3>
        {(photo.place || place) && (
          <p className="text-sm text-white/80">
            {photo.place || place}
          </p>
        )}
      </div>
    </div>
  );
}
