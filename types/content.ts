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
  languages: string[];
}

export interface About {
  bio: string;
  focus: string[];
}

export interface Photography {
  intro: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  src: string;
  caption: string;
  place: string;
}

export interface Report {
  id: string;
  title: string;
  medium: string;
  year: string;
  summary: string;
  url: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  organization: string;
  dates: string;
  description: string;
}

export interface Contact {
  email: string;
  socials: {
    [key: string]: string;
  };
}
