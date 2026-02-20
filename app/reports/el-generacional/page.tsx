'use client';

import Link from 'next/link';
import { getReports } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import ArticleCard from '@/components/ArticleCard';
import Section from '@/components/Section';
import { getTranslations } from '@/lib/i18n';

export default function ElGeneracionalPage() {
  const { language } = useTheme();
  const allReports = getReports(language);
  const t = getTranslations(language);

  // Filtrar reportajes de El Generacional
  const elGeneracionalReports = allReports.filter(
    (report) => report.medium === 'El Generacional'
  );

  return (
    <Section className="bg-black">
      <div className="space-y-0">
        {elGeneracionalReports.map((report, index) => (
          <div
            key={report.id}
            className="py-12 border-b border-gray-800 last:border-b-0 bg-black"
          >
            <ArticleCard report={report} isFirst={index === 0} />
          </div>
        ))}
      </div>
      <div className="pt-12 pb-8 text-center">
        <Link
          href="/reports/all"
          className="group inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors underline underline-offset-4 decoration-2"
        >
          {t.reports.viewAll}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </Section>
  );
}
