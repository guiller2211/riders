import type { Country, Currency, Language, Locale } from '@ducati/types';

import { AbstractService } from './service';

export abstract class LocalizationService extends AbstractService {
  static TYPE = 'localizationService';

  protected constructor(type?: string) {
    super(type ?? LocalizationService.TYPE);
  }

  abstract getCountry(isocode: string): Country;

  abstract getCurrency(isocode: string): Currency;

  abstract getLanguage(isocode: string): Language;

  abstract getLocale(isocode: string): Locale;
}
