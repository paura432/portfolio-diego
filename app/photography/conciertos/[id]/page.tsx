import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AlbumEventPage from '@/components/photography/AlbumEventPage';
import { buildAlbumPageMetadata } from '@/lib/albumPageMetadata';
import { getPhotoEvent, getPhotoEventIds } from '@/lib/content';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getPhotoEventIds('conciertos').map((id) => ({ id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  return buildAlbumPageMetadata('conciertos', params.id);
}

export default function ConciertoAlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const eventEs = getPhotoEvent('conciertos', params.id, 'es');
  const eventEn = getPhotoEvent('conciertos', params.id, 'en');
  if (!eventEs || !eventEn) notFound();
  return (
    <AlbumEventPage
      category="conciertos"
      eventEs={eventEs}
      eventEn={eventEn}
    />
  );
}
