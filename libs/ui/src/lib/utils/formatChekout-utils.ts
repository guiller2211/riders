import type { AddressData } from '../types';

export const getFormatAddressPrevious = (address: AddressData) => {
  const { streetNumber, streetName, state, postalCode } = address;
  return `${streetNumber ?? ''} ${streetName ?? ''}, ${
    state?.countryIso ?? ''
  } ${postalCode ?? ''} - `;
};
