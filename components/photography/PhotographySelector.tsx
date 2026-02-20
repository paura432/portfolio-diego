'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PhotographySelectorProps {
  conciertosLabel: string;
  carrerasLabel: string;
  fotoReportagesLabel: string;
  coberturasLabel: string;
}

/**
 * Selector de categorías de fotografía con diseño pill/tabs
 */
export default function PhotographySelector({
  conciertosLabel,
  carrerasLabel,
  fotoReportagesLabel,
  coberturasLabel,
}: PhotographySelectorProps) {
  const pathname = usePathname();
  const isConciertos = pathname === '/photography/conciertos';
  const isCarreras = pathname === '/photography/carreras';
  const isFotoReportages = pathname === '/photography/foto-reportages';
  const isCoberturas = pathname === '/photography/coberturas';

  const linkClass = (isActive: boolean) =>
    `px-5 py-2.5 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 ${
      isActive
        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <nav
      className="inline-flex p-1 rounded-2xl bg-gray-100/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700"
      aria-label="Selección de categoría fotográfica"
    >
      <div className="flex flex-wrap gap-0.5">
        <Link
          href="/photography/conciertos"
          className={linkClass(isConciertos)}
        >
          {conciertosLabel}
        </Link>
        <Link
          href="/photography/carreras"
          className={linkClass(isCarreras)}
        >
          {carrerasLabel}
        </Link>
        <Link
          href="/photography/foto-reportages"
          className={linkClass(isFotoReportages)}
        >
          {fotoReportagesLabel}
        </Link>
        <Link
          href="/photography/coberturas"
          className={linkClass(isCoberturas)}
        >
          {coberturasLabel}
        </Link>
      </div>
    </nav>
  );
}
