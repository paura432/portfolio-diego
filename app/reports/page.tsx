import { redirect } from 'next/navigation';

/**
 * Redirige /reports a /reports/tfg
 */
export default function ReportsPage() {
  redirect('/reports/tfg');
}
