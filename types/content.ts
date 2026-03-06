/**
 * Tipos TypeScript para el contenido del portfolio
 * Todos los tipos están alineados con la estructura de content.json
 */

export interface Content {
  site: SiteInfo;
  about: About;
  photography: Photography;
  reports: Report[];
  work: WorkExperience[];
  contact: Contact;
}

export interface SiteInfo {
  name: string;
  role: string;
  location: string;
  profileImage?: string;
  languages: string[];
}

export interface About {
  bio: string;
  focus: string[];
}

export interface Photography {
  intro: string;
  conciertos: PhotoEvent[];
  carreras: PhotoEvent[];
  coberturas: PhotoEvent[];
}

export interface PhotoEvent {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  place: string;
  date?: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  src: string;
  caption: string;
  place?: string;
  /** Orientación de la foto: vertical se muestra en pares lado a lado */
  orientation?: 'horizontal' | 'vertical';
  /** Dimensiones originales para mostrar sin deformar */
  width?: number;
  height?: number;
}

export interface Report {
  id: string;
  title: string;
  medium: string;
  year: string;
  summary: string;
  url: string;
  image?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  organization: string;
  dates: string;
  description: string;
}

export interface Contact {
  phone: string;
  email: string;
  socials: {
    [key: string]: string;
  };
}
