import { redirect } from 'next/navigation';

/**
 * Redirige /reports a /reports/diario-as
 */
export default function ReportsPage() {
  redirect('/reports/diario-as');
}
