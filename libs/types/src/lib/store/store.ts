import type { Country, Currency, Language, Locale } from '../localization';
import type { Resource } from '..';

export interface Store extends Resource {
  name: string;
  countries: Country[];
  defaultCountry: Country;
  currencies: Currency[];
  defaultCurrency: Currency;
  languages: Language[];
  defaultLanguage: Language;
  locales: Locale[];
  defaultLocale: Locale;
}
