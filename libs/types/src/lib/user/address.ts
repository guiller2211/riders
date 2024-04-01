import type { CommunesData, Country, RegionData, State } from '..';

export interface AddressData {
  id: string;
  key?: string;
  firstName?: string;
  lastName?: string;
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: State;
  region?: RegionData;
  communes?: CommunesData;
  postalCode?: string;
  country?: Country;
  phone?: string;
  email?: string;
  shippingAddress?: boolean;
  billingAddress?: boolean;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}
