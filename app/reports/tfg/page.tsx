'use client';

import Image from 'next/image';
import Section from '@/components/Section';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslations } from '@/lib/i18n';

const TFG_URL = 'https://tfgdiegodelgadolerma.myportfolio.com/tfg';

export default function TFGPage() {
  const { language } = useTheme();
  const t = getTranslations(language);

  return (
    <Section className="bg-black py-12 sm:py-16">
      <div className="py-12">
          <div className="max-w-4xl">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1">
                <a
                  href={TFG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <Image
                      src="/tfg-camara.jpg"
                      alt="Cámara Sony 4K con micrófono, preparando equipo de grabación"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  </div>
                </a>
              </div>
              <div className="md:col-span-2 space-y-4">
                <span className="px-4 py-1.5 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                  {t.reports.tfg}
                </span>
                <a
                  href={TFG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-gray-900 dark:text-gray-100 leading-tight hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer">
                    {t.reports.tfgTitle}
                  </h2>
                </a>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg max-w-3xl">
                  {t.reports.tfgSummary}
                </p>
                <a
                  href={TFG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-700 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 font-medium transition-colors underline underline-offset-4 decoration-2"
                >
                  {t.reports.tfgView}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
      </div>
    </Section>
  );
}
