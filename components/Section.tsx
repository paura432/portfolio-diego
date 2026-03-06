import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Componente Section: Contenedor estándar para secciones del portfolio
 * Estilo minimalista con mucho espacio en blanco
 */
export default function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}
