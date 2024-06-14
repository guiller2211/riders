import { AbstractOrder, AbstractOrderEntry } from '../order';

export interface CartData extends AbstractOrder {
  promotions?: string[];
  entries: CartEntry[];
}

export interface CartEntry extends AbstractOrderEntry {
  readOnly?: boolean; 
}

export interface CartAction {
  cart: CartData | string | null;
}

export interface AddToCartAction extends CartAction {
  sku: string;
  quantity: number;
}

export interface UpdateLineQuantityAction extends CartAction {
  lineItemId: string;
  quantity: number;
}

export interface SetCartEmailAction extends CartAction {
  email: string;
}

export interface RemoveLineItemAction extends CartAction {
  lineItemId: string;
  quantity: number;
}

export interface SetShippingAddressAction extends CartAction {
  address: ShippingAddressRequest;
}

export interface ShippingAddressRequest {
  key: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  additionalStreetInfo?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  state?: string;
  country?: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
}

export interface SetShippingMethodAction extends CartAction {
  shippingMethod: ShippingMethodRequest;
}

export interface ShippingMethodRequest {
  id: string;
}

export interface SetCustomerIdAction extends CartAction {
  customerId: string;
}
