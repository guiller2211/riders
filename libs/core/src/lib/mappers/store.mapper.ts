import type { Store } from '@ducati/types';
import {
  MethodNotImplementedError,
  ValidationError,
} from '@ducati/types';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

import type { DataMapper } from '.';
import type { LocalizationService } from '../services';

export class FileSystemStoreMapper implements DataMapper<Store, any> {
  private logger: Logger<ILogObj> = new Logger({
    name: 'FileSystemStoreMapper',
  });

  protected localizationService: LocalizationService;

  constructor(localizationService: LocalizationService) {
    this.localizationService = localizationService;
  }

  normalize(json: any): Store {
    try {
      const enabledCountryIsocodes: string[] = json.countries.enabled;
      const defaultCountryIsocode: string = json.countries.default;

      const enabledCurrencyIsocodes: string[] = json.currencies.enabled;
      const defaultCurrencyIsocode: string = json.currencies.default;

      const enabledLocaleIsocodes: string[] = json.locales.enabled;
      const defaultLocaleIsocode: string = json.locales.default;

      const enabledLanguageIsocodes: string[] = json.languages.enabled;
      const defaultLanguageIsocode: string = json.languages.default;

      return {
        id: json.id,
        name: json.name,
        countries: enabledCountryIsocodes.map((isocode: string) => {
          return this.localizationService.getCountry(isocode);
        }),
        defaultCountry: this.localizationService.getCountry(
          defaultCountryIsocode,
        ),
        currencies: enabledCurrencyIsocodes.map((isocode: string) => {
          return this.localizationService.getCurrency(isocode);
        }),
        defaultCurrency: this.localizationService.getCurrency(
          defaultCurrencyIsocode,
        ),
        languages: enabledLanguageIsocodes.map((isocode: string) => {
          return this.localizationService.getLanguage(isocode);
        }),
        defaultLanguage: this.localizationService.getLanguage(
          defaultLanguageIsocode,
        ),
        locales: enabledLocaleIsocodes.map((isocode: string) => {
          return this.localizationService.getLocale(isocode);
        }),
        defaultLocale: this.localizationService.getLocale(defaultLocaleIsocode),
      };
    } catch (e: unknown) {
      if (e instanceof TypeError) {
        this.logger.error('Store data is invalid!', e);
        throw new ValidationError('Store data is invalid!');
      }
      throw e;
    }
  }

  serialize(store: Store): any {
    throw new MethodNotImplementedError();
  }
}
