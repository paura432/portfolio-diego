'use client';

import { getPhotoEvents } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import PhotoCategory from '@/components/photography/PhotoCategory';
import { getTranslations } from '@/lib/i18n';

export default function CarrerasPage() {
  const { language } = useTheme();
  const events = getPhotoEvents('carreras', language);
  const t = getTranslations(language);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
      <PhotoCategory
        title={t.photography.carreras}
        events={events}
        category="carreras"
      />
    </div>
  );
}
