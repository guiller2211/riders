import type { BadgeProps } from 'reshaped';

import type { Resource } from '../resource';
import type { User, UserGroup } from '../user';
import type { Channel } from '../channel';
import type { Country, Currency, Money } from '../localization';

export interface Price extends Resource {
  productId?: string;
  value: Money;
  active?: boolean;
  validFrom?: Date;
  validUntil?: Date;
  user?: User;
  channel?: Channel;
  userGroup?: UserGroup;
  country?: Country;
  // discounted
  // tiers
  // custom fields
}

export interface PriceSummary {
  min?: Money;
  max?: Money;
}

export interface PriceContext {
  currency?: Currency;
  country?: Country;
  date?: Date;
  channel?: Channel;
  user?: User;
  userGroup?: UserGroup;
}

export interface CartProductPrice {
  className?: string;
  priceClassName?: string;
  priceWrapperClassName?: string;
  originalPriceClassName?: string;
  savingPriceClassName?: string;
  price?: Price;
  originalPrice?: string;
  saving?: string;
  badge?: BadgeProps;
  promotionOnTop?: boolean;
  inline?: boolean;
}
