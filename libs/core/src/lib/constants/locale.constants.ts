import type { Locale } from '@ducati/types';
import { TextDirectionality } from '@ducati/types';

import { EN, FR, ES } from './language.constants';

export const EN_US: Locale = {
  isocode: 'en-US',
  language: EN,
  name: 'English (United States)',
  textDirectionality: TextDirectionality.LEFT_TO_RIGHT,
};
export const FR_CA: Locale = {
  isocode: 'fr_CA',
  language: FR,
  name: 'French (Canadian)',
  textDirectionality: TextDirectionality.LEFT_TO_RIGHT,
};
export const ES_ES: Locale = {
  isocode: 'es_ES',
  language: ES,
  name: 'Spanish (Spain)',
  textDirectionality: TextDirectionality.LEFT_TO_RIGHT,
};

export const LOCALES: Map<string, Locale> = new Map<string, Locale>([
  [EN_US.isocode, EN_US],
  [FR_CA.isocode, FR_CA],
]);
