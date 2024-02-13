import type { Country } from '@ducati/types';

export const CA: Country = {
  isocode: 'CA',
  name: 'Canada',
};
export const US: Country = {
  isocode: 'US',
  name: 'United States of America',
};

export const COUNTRIES: Map<string, Country> = new Map<string, Country>([
  [CA.isocode, CA],
  [US.isocode, US],
]);
