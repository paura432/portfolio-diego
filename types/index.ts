export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface Article {
  id: string;
  source: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
}
