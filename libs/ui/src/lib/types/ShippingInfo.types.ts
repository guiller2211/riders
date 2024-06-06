import { CommunesData, RegionData } from "@ducati/types";

export interface ShippingInfo {
  id?: string;
  firstName?: string;
  lastName?: string
  region?: RegionData;
  email?: string;
  postalCode?: string;
  communes?: CommunesData;
  phone?: string;
  streetName?: string;
  defaultShippingAddress?: boolean;
}
