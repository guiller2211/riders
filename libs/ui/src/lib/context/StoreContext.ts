import type { Context } from 'react';
import { createContext } from 'react';
import type {
  Country,
  Currency,
  Language,
  Locale,
  Store,
} from '@ducati/types';

export const initialStoreContext: Store = {
  id: '',
  name: '',
  countries: [] as Country[],
  defaultCountry: {} as Country,
  currencies: [] as Currency[],
  defaultCurrency: {} as Currency,
  languages: [] as Language[],
  defaultLanguage: {} as Language,
  locales: [] as Locale[],
  defaultLocale: {} as Locale,
};
export const StoreContext: Context<Store> =
  createContext<Store>(initialStoreContext);
