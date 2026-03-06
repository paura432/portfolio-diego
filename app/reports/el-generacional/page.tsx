'use client';

import { getReports } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import ArticleCard from '@/components/ArticleCard';
import Section from '@/components/Section';

export default function ElGeneracionalPage() {
  const { language } = useTheme();
  const allReports = getReports(language);

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
    </Section>
  );
}
