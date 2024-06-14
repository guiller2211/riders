import { CommunesData, Country, RegionData, State } from "@riders/types";

export interface AddressData {
  id: string;
  key?: string;
  firstName?: string;
  lastName?: string;
  streetNumber?: string;
  streetName?: string;
  line1?: string;
  line2?: string;
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
