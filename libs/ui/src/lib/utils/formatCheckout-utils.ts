import { AddressData } from "@riders/types";

export const getFormatAddressPrevious = (address: AddressData) => {
  const { streetNumber, streetName, state, postalCode } = address;
  return `${streetNumber ?? ''} ${streetName ?? ''}, ${
    state?.countryIso ?? ''
  } ${postalCode ?? ''} - `;
};
