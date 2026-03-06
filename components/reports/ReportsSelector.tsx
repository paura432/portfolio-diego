'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ReportsSelectorProps {
  tfgLabel: string;
}

/**
 * Selector de reportajes (actualmente solo TFG)
 */
export default function ReportsSelector({ tfgLabel }: ReportsSelectorProps) {
  const pathname = usePathname();
  const isTfg = pathname === '/reports/tfg';

  const linkClass = (isActive: boolean) =>
    `px-5 py-2.5 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 ${
      isActive
        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <nav
      className="inline-flex p-1 rounded-2xl bg-gray-100/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700"
      aria-label="Selección de reportajes"
    >
      <Link href="/reports/tfg" className={linkClass(isTfg)}>
        {tfgLabel}
      </Link>
    </nav>
  );
}
