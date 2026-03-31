import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AlbumEventPage from '@/components/photography/AlbumEventPage';
import { buildAlbumPageMetadata } from '@/lib/albumPageMetadata';
import { getPhotoEvent, getPhotoEventIds } from '@/lib/content';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getPhotoEventIds('coberturas').map((id) => ({ id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  return buildAlbumPageMetadata('coberturas', params.id);
}

export default function CoberturaAlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const eventEs = getPhotoEvent('coberturas', params.id, 'es');
  const eventEn = getPhotoEvent('coberturas', params.id, 'en');
  if (!eventEs || !eventEn) notFound();
  return (
    <AlbumEventPage
      category="coberturas"
      eventEs={eventEs}
      eventEn={eventEn}
    />
  );
}
