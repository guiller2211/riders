import type { Country, Region, State } from '..';

export interface Address {
  id: string;
  key?: string;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: State;
  region?: Region;
  postalCode?: string;
  country?: Country;
  phone?: string;
  email?: string;
  shippingAddress?: boolean;
  billingAddress?: boolean;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}
