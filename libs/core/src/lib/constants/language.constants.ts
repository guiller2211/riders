import type { Language } from '@ducati/types';

export const EN: Language = {
  isocode: 'en',
  name: 'English',
};
export const ES: Language = {
  isocode: 'es',
  name: 'Spanish',
};
export const FR: Language = {
  isocode: 'fr',
  name: 'French',
};

export const LANGUAGES: Map<string, Language> = new Map<string, Language>([
  [EN.isocode, EN],
  [ES.isocode, ES],
  [FR.isocode, FR],
]);
