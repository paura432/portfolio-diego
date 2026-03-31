import type { Metadata } from 'next';
import { getPhotoEvent } from '@/lib/content';

export function buildAlbumPageMetadata(
  category: 'conciertos' | 'carreras' | 'coberturas',
  id: string
): Metadata {
  const event = getPhotoEvent(category, id, 'es');
  if (!event) {
    return { title: 'Fotografía · Diego Delgado Lerma' };
  }
  const description =
    event.description?.slice(0, 155)?.trim() || event.title;
  const title = `${event.title} · Diego Delgado Lerma`;
  const ogImage = event.coverImage ? [{ url: event.coverImage, alt: event.title }] : undefined;
  return {
    title,
    description,
    openGraph: {
      title: event.title,
      description,
      type: 'article',
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description,
      images: ogImage?.map((i) => i.url),
    },
  };
}
