'use client';

import { getPhotography } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import PhotoCategory from '@/components/photography/PhotoCategory';
import { getTranslations } from '@/lib/i18n';

export default function ConciertosPage() {
  const { language } = useTheme();
  const photography = getPhotography(language);
  const t = getTranslations(language);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <PhotoCategory
        title={t.photography.conciertos}
        photos={photography.conciertos}
      />
    </div>
  );
}
