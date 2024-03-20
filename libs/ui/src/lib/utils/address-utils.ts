
import { Address } from '@ducati/types';
import type { AddressData } from '../types';

export const getAddress = (address: Address): AddressData => {
  return {
    id: address?.id ?? '',
    key: address?.key,
    title: address?.title,
    firstName: address?.firstName,
    lastName: address?.lastName,
    streetNumber: address?.streetNumber,
    streetName: address?.streetName,
    city: address?.city,
    state: address?.state,
    region: address?.region,
    postalCode: address?.postalCode,
    country: address.country,
    phone: address?.phone,
    email: address?.email,
  };
};
