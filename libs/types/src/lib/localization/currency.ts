export interface Currency {
  isocode: string;
  name: string;
  symbol: string;
  symbolPosition: CurrencySymbolPosition;
  decimalPlaces: number;
}

export enum CurrencySymbolPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

export interface Money {
  centsAmount: number;
  currency: Currency;
}
