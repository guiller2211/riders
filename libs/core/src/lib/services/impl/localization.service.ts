import type {
  Country,
  Currency,
  Language,
  Locale,
  Region,
  State,
} from '@ducati/types';
import { ConstantNotDefinedError } from '@ducati/types';

import { LocalizationService } from '..';
import {
  COUNTRIES,
  CURRENCIES,
  LANGUAGES,
  LOCALES,
  REGIONS_CA,
  REGIONS_US,
  STATES_CA,
  STATES_US,
} from '../../constants';

export class LocalizationConstantsService extends LocalizationService {
  constructor() {
    super();
  }

  getCountry(isocode: string): Country {
    if (isocode) {
      const isocodeKey: string = isocode.toUpperCase();
      const country: Country | undefined = COUNTRIES.get(isocodeKey);
      if (country) {
        return country;
      }
      throw new ConstantNotDefinedError('Country', isocodeKey);
    }
    throw new ConstantNotDefinedError('Country', isocode);
  }

  getCurrency(isocode: string): Currency {
    if (isocode) {
      const isocodeKey: string = isocode.toUpperCase();
      const currency: Currency | undefined = CURRENCIES.get(isocodeKey);
      if (currency) {
        return currency;
      }
      throw new ConstantNotDefinedError('Currency', isocodeKey);
    }
    throw new ConstantNotDefinedError('Currency', isocode);
  }

  getLanguage(isocode: string): Language {
    if (isocode) {
      const isocodeKey: string = isocode.toLowerCase();
      const language: Language | undefined = LANGUAGES.get(isocodeKey);
      if (language) {
        return language;
      }
      throw new ConstantNotDefinedError('Language', isocodeKey);
    }
    throw new ConstantNotDefinedError('Language', isocode);
  }

  getLocale(isocode: string): Locale {
    const isocodeSplit: string[] = isocode.split('-');
    if (isocodeSplit && isocodeSplit.length == 2) {
      const isocodeKey: string = `${isocodeSplit[0].toLowerCase()}-${isocodeSplit[1].toUpperCase()}`;
      const locale: Locale | undefined = LOCALES.get(isocodeKey);
      if (locale) {
        return locale;
      }
      throw new ConstantNotDefinedError('Locale', isocodeKey);
    }
    throw new ConstantNotDefinedError('Locale', isocode);
  }

  getRegion(isocode: string): Region {
    if (isocode) {
      const isocodeKey: string = isocode.toUpperCase();
      let region: Region | undefined;

      if (REGIONS_US.has(isocodeKey)) {
        region = REGIONS_US.get(isocodeKey);
      } else if (REGIONS_CA.has(isocodeKey)) {
        region = REGIONS_CA.get(isocodeKey);
      }
      if (region) {
        return region;
      }
      throw new ConstantNotDefinedError('Region', isocodeKey);
    }
    throw new ConstantNotDefinedError('Region', isocode);
  }

  getState(isocode: string): State {
    const isocodeKey: string = isocode.toUpperCase();
    let state: State | undefined;

    if (STATES_CA.has(isocodeKey)) {
      state = STATES_CA.get(isocodeKey);
    } else if (STATES_US.has(isocodeKey)) {
      state = STATES_US.get(isocodeKey);
    }
    if (state) {
      return state;
    }
    throw new ConstantNotDefinedError('State', isocodeKey);

    throw new ConstantNotDefinedError('State', isocode);
  }
}
