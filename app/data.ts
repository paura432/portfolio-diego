import { Photo, Article, TimelineItem, Skill } from '@/types';

export const photos: Photo[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    alt: 'Manifestación estudiantil',
    title: 'Movimiento Estudiantil',
    description: 'Manifestación por la educación pública, Madrid 2023'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
    alt: 'Mercado local',
    title: 'Vida Cotidiana',
    description: 'Mercado de abastos, barrio de Lavapiés'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    alt: 'Retrato callejero',
    title: 'Retratos Urbanos',
    description: 'Serie sobre la diversidad en la ciudad'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    alt: 'Biblioteca pública',
    title: 'Espacios Públicos',
    description: 'Biblioteca municipal como espacio de encuentro'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
    alt: 'Trabajador',
    title: 'Mundo Laboral',
    description: 'Documental sobre trabajadores de la construcción'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    alt: 'Cultura urbana',
    title: 'Cultura Urbana',
    description: 'Arte callejero y expresión cultural'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Naturaleza',
    title: 'Entorno Natural',
    description: 'Fotografía ambiental y sostenibilidad'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop',
    alt: 'Evento cultural',
    title: 'Eventos Culturales',
    description: 'Festival de música independiente'
  }
];

export const articles: Article[] = [
  {
    id: '1',
    source: 'El Diario Universitario',
    date: 'Marzo 2024',
    title: 'La crisis de la vivienda estudiantil en Madrid',
    excerpt: 'Un análisis en profundidad sobre las dificultades que enfrentan los estudiantes para encontrar alojamiento asequible en la capital. Entrevistas con afectados, datos oficiales y propuestas de solución desde las asociaciones estudiantiles.',
    link: '#'
  },
  {
    id: '2',
    source: 'Revista Digital UCM',
    date: 'Enero 2024',
    title: 'Mujeres en el periodismo: rompiendo techos de cristal',
    excerpt: 'Reportaje sobre la situación de las mujeres periodistas en España. Entrevistas con profesionales consolidadas y jóvenes que están abriendo camino en medios tradicionales y digitales.',
    link: '#'
  },
  {
    id: '3',
    source: 'Medio Local',
    date: 'Diciembre 2023',
    title: 'La transformación del barrio: gentrificación y resistencia',
    excerpt: 'Investigación sobre los procesos de gentrificación en el centro de Madrid. Voces de vecinos históricos, nuevos residentes y comerciantes que reflejan los cambios y las tensiones en el territorio.',
    link: '#'
  },
  {
    id: '4',
    source: 'Trabajo Académico',
    date: 'Noviembre 2023',
    title: 'Desinformación y redes sociales: el caso de las elecciones',
    excerpt: 'Análisis sobre cómo se propagó la desinformación durante las últimas elecciones generales. Fact-checking, entrevistas con expertos y propuestas para mejorar la alfabetización mediática.',
    link: '#'
  },
  {
    id: '5',
    source: 'Colaboración Externa',
    date: 'Octubre 2023',
    title: 'El futuro del periodismo local en la era digital',
    excerpt: 'Reportaje sobre cómo los medios locales están adaptándose a la transformación digital. Casos de éxito, desafíos y el papel fundamental del periodismo de proximidad en las democracias locales.',
    link: '#'
  }
];

export const timelineItems: TimelineItem[] = [
  {
    id: '1',
    date: '2021 - Presente',
    title: 'Grado en Periodismo',
    subtitle: 'Universidad Complutense de Madrid',
    description: 'Formación en redacción periodística, investigación, fotografía, edición de video y radio. Especialización en periodismo de investigación y comunicación digital.'
  },
  {
    id: '2',
    date: 'Enero - Junio 2024',
    title: 'Prácticas Profesionales',
    subtitle: 'El Diario Universitario',
    description: 'Redacción de artículos, cobertura de eventos universitarios, entrevistas y reportajes. Aprendizaje en el día a día de una redacción digital.'
  },
  {
    id: '3',
    date: '2023 - Presente',
    title: 'Colaboradora Freelance',
    subtitle: 'Medios Locales y Digitales',
    description: 'Redacción de artículos sobre cultura, sociedad y actualidad. Trabajo en equipo con editores y fotógrafos.'
  },
  {
    id: '4',
    date: '2022 - 2023',
    title: 'Voluntariado',
    subtitle: 'Asociación de Periodistas Jóvenes',
    description: 'Organización de eventos, talleres de formación y creación de contenido para redes sociales. Promoción del periodismo responsable entre jóvenes.'
  }
];

export const skills: Skill[] = [
  { id: '1', name: 'Redacción Periodística' },
  { id: '2', name: 'Investigación' },
  { id: '3', name: 'Entrevistas' },
  { id: '4', name: 'Fotografía Documental' },
  { id: '5', name: 'Edición de Video' },
  { id: '6', name: 'Comunicación Digital' },
  { id: '7', name: 'Fact-checking' },
  { id: '8', name: 'Redes Sociales' }
];

export const profileData = {
  name: 'María González',
  title: 'Estudiante de Periodismo',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  bio: [
    'Apasionada por contar historias que importan. Estudiante de Periodismo en la Universidad Complutense de Madrid, especializada en periodismo de investigación y fotografía documental. Mi enfoque se centra en dar voz a quienes no la tienen y en explorar las realidades sociales a través de la palabra escrita y la imagen.',
    'Desde pequeña, las historias me han fascinado. Ya fuera a través de los libros, los documentales o las conversaciones con mi abuela, siempre he sentido la necesidad de entender el mundo que me rodea y compartir esas comprensiones con otros.',
    'Mi formación académica me ha permitido desarrollar habilidades en investigación, redacción, entrevistas y fotografía. He tenido la oportunidad de colaborar con medios locales y realizar prácticas en redacciones digitales, donde he aprendido la importancia del rigor, la ética y la empatía en el ejercicio del periodismo.',
    'Mi objetivo es convertirme en una periodista que contribuya a informar de manera responsable, que cuestione el poder y que ayude a construir una sociedad más informada y crítica.'
  ],
  quote: 'El periodismo es el arte de contar la verdad de manera que la gente quiera leerla.',
  email: 'maria.gonzalez@email.com',
  socialLinks: [
    { id: '1', name: 'LinkedIn', url: '#' },
    { id: '2', name: 'Twitter', url: '#' },
    { id: '3', name: 'Instagram', url: '#' }
  ]
};
