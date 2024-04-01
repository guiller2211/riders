import type { BaseError } from './errors';
import type { AddressData } from '../user/address';

export enum CountryType {
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
}

export interface AddressValidation {
  decision?: string;
  // TODO: Simplify with converter

  errors?: { errors: BaseError[] };
  suggestedAddresses?: AddressData[];
}
