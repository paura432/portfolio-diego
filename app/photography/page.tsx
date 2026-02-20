import { redirect } from 'next/navigation';

/**
 * Redirige /photography a /photography/conciertos
 */
export default function PhotographyPage() {
  redirect('/photography/conciertos');
}
