import esContent from '@/data/content.es.json';
import enContent from '@/data/content.en.json';
import { Content } from '@/types/content';
import { Language } from './i18n';

/**
 * Obtiene el contenido completo según el idioma seleccionado
 */
export function getContent(language: Language = 'es'): Content {
  return language === 'es' ? esContent as Content : enContent as Content;
}

/**
 * Obtiene la información del sitio según el idioma
 */
export function getSiteInfo(language: Language = 'es') {
  return getContent(language).site;
}

/**
 * Obtiene la información sobre el periodista según el idioma
 */
export function getAbout(language: Language = 'es') {
  return getContent(language).about;
}

/**
 * Obtiene toda la información de fotografía según el idioma
 */
export function getPhotography(language: Language = 'es') {
  return getContent(language).photography;
}

/**
 * Obtiene todos los reportajes según el idioma
 */
export function getReports(language: Language = 'es') {
  return getContent(language).reports;
}

/**
 * Obtiene toda la experiencia laboral según el idioma
 */
export function getWork(language: Language = 'es') {
  return getContent(language).work;
}

/**
 * Obtiene la información de contacto según el idioma
 */
export function getContact(language: Language = 'es') {
  return getContent(language).contact;
}
