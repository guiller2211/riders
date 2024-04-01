import type { Resource } from '../resource';
import type {  CurrencyData, Money, RegionData } from '../localization';

export interface PriceData extends Resource {
  productId?: string;
  value: Money;
}

export interface DeliveryCostData extends Resource {
  regionId: RegionData;
  value: CurrencyData;
}
