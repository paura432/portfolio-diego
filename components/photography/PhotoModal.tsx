'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/content';

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  place?: string;
  /** Lista de fotos para navegación (opcional) */
  photos?: Photo[];
  /** Índice de la foto actual en la lista (opcional) */
  currentIndex?: number;
  /** Callback para ir a la foto anterior (opcional) */
  onPrev?: () => void;
  /** Callback para ir a la foto siguiente (opcional) */
  onNext?: () => void;
}

/**
 * Modal para mostrar una foto en grande con su pie de foto
 * Soporta navegación con flechas (clic y teclado) cuando se pasan photos, currentIndex, onPrev y onNext
 */
export default function PhotoModal({ photo, isOpen, onClose, place, photos = [], currentIndex = 0, onPrev, onNext }: PhotoModalProps) {
  const hasPrev = photos.length > 0 && currentIndex >= 0 && currentIndex > 0 && onPrev;
  const hasNext = photos.length > 0 && currentIndex >= 0 && currentIndex < photos.length - 1 && onNext;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, hasPrev, hasNext, onPrev, onNext]);

  if (!isOpen || !photo) return null;

  return (
    <div
      className="fixed inset-0 z-[1200] flex flex-col bg-black"
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

      {/* Flecha izquierda - foto anterior */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev!();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-all touch-manipulation"
          aria-label="Foto anterior"
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Flecha derecha - foto siguiente */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext!();
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-all touch-manipulation"
          aria-label="Foto siguiente"
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

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
          unoptimized
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
