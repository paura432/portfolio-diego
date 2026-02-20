'use client';

import { getReports } from '@/lib/content';
import { useTheme } from '@/contexts/ThemeContext';
import ArticleCard from '@/components/ArticleCard';
import Section from '@/components/Section';

export default function AllReportsPage() {
  const { language } = useTheme();
  const allReports = getReports(language);

  return (
    <Section className="bg-black">
      <div className="space-y-0">
        {allReports.map((report, index) => (
          <div
            key={report.id}
            className="py-12 border-b border-gray-800 last:border-b-0 bg-black"
          >
            <ArticleCard report={report} />
          </div>
        ))}
      </div>
    </Section>
  );
}
