'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ReportsSelectorProps {
  diarioAsLabel: string;
  infoperiodistasLabel: string;
  elGeneracionalLabel: string;
}

/**
 * Selector de medios de reportajes con diseño pill/tabs
 */
export default function ReportsSelector({
  diarioAsLabel,
  infoperiodistasLabel,
  elGeneracionalLabel,
}: ReportsSelectorProps) {
  const pathname = usePathname();
  const isDiarioAs = pathname === '/reports/diario-as';
  const isInfoperiodistas = pathname === '/reports/infoperiodistas';
  const isElGeneracional = pathname === '/reports/el-generacional';

  const linkClass = (isActive: boolean) =>
    `px-5 py-2.5 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 ${
      isActive
        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <nav
      className="inline-flex p-1 rounded-2xl bg-gray-100/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700"
      aria-label="Selección de medio periodístico"
    >
      <div className="flex flex-wrap gap-0.5">
        <Link
          href="/reports/diario-as"
          className={linkClass(isDiarioAs)}
        >
          {diarioAsLabel}
        </Link>
        <Link
          href="/reports/infoperiodistas"
          className={linkClass(isInfoperiodistas)}
        >
          {infoperiodistasLabel}
        </Link>
        <Link
          href="/reports/el-generacional"
          className={linkClass(isElGeneracional)}
        >
          {elGeneracionalLabel}
        </Link>
      </div>
    </nav>
  );
}
