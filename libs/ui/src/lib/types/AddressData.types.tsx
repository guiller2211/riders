import { Country, Region, State } from "@ducati/types";

export interface AddressData {
  id?: string;
  key?: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: State;
  region?: Region;
  postalCode?: string;
  country?: Country;
  phone?: string;
  email?: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
  billingAddress?: boolean;
  shippingAddress?: boolean;
  line1?: string;
  line2?: string;
  additionalStreetInfo?: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  mobile?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
}
