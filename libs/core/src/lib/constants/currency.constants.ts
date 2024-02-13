import type { Currency } from '@ducati/types';
import { CurrencySymbolPosition } from '@ducati/types';

export const USD: Currency = {
  isocode: 'USD',
  name: 'US Dollar',
  symbol: '$',
  decimalPlaces: 2,
  symbolPosition: CurrencySymbolPosition.BEFORE,
};
export const EUR: Currency = {
  isocode: 'EUR',
  name: 'Euro',
  symbol: '€',
  decimalPlaces: 2,
  symbolPosition: CurrencySymbolPosition.BEFORE,
};

export const CURRENCIES: Map<string, Currency> = new Map<string, Currency>([
  [USD.isocode, USD],
  [EUR.isocode, EUR],
]);
