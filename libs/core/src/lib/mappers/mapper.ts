/*
 *  Definition for mapping data to/from backend systems
 */

import type { Locale, Session } from '@ducati/types';

export interface DataMapper<In, Out> {
  // Map data from a backend into the storefront
  normalize(data: Out, session?: Session): In;

  // Map data from the storefront to a backend
  serialize(data: In, session?: Session): Out;
}

export interface LocalizedDataMapper<In, Out> {
  // Map data from a backend into the storefront
  normalize(data: Out, locale: Locale): In;

  // Map data from the storefront to a backend
  serialize(data: In, locale: Locale): Out;
}
