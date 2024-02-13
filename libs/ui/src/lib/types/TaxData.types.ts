import type { PriceData } from './PriceData.types';

export type TaxData = {
  name: string;
  rate: number;
  amount: PriceData;
};
