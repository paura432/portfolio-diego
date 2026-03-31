import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AlbumEventPage from '@/components/photography/AlbumEventPage';
import { buildAlbumPageMetadata } from '@/lib/albumPageMetadata';
import { getPhotoEvent, getPhotoEventIds } from '@/lib/content';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getPhotoEventIds('carreras').map((id) => ({ id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  return buildAlbumPageMetadata('carreras', params.id);
}

export default function CarreraAlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const eventEs = getPhotoEvent('carreras', params.id, 'es');
  const eventEn = getPhotoEvent('carreras', params.id, 'en');
  if (!eventEs || !eventEn) notFound();
  return (
    <AlbumEventPage category="carreras" eventEs={eventEs} eventEn={eventEn} />
  );
}
