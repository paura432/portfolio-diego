'use client';

import { getReports } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import ArticleCard from '@/components/ArticleCard';
import Section from '@/components/Section';

export default function DiarioAsPage() {
  const { language } = useTheme();
  const allReports = getReports(language);

  // Filtrar reportajes de AS.com y AS.com Tikitakas
  const diarioAsReports = allReports.filter(
    (report) => report.medium === 'AS.com' || report.medium === 'AS.com Tikitakas'
  );

  return (
    <Section className="bg-white dark:bg-black">
      <div className="space-y-0">
        {diarioAsReports.map((report, index) => (
          <div
            key={report.id}
            className={`py-12 border-b border-gray-200 dark:border-gray-800 last:border-b-0 ${
              index % 2 === 0
                ? 'bg-white dark:bg-black'
                : 'bg-gray-50 dark:bg-gray-900'
            }`}
          >
            <ArticleCard report={report} isFirst={index === 0} />
          </div>
        ))}
      </div>
    </Section>
  );
}
