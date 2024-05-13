import { AddressData } from "../types";
import { generateRandomId } from "./generateRandomId-utils";

/* address: AddressData */

export const getAddress = (formData: FormData): AddressData => {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const address = formData.get('address') as string;
  const region = formData.get('region') as string;
  const state = formData.get('state') as string;
  const zipCode = formData.get('zipCode') as string;
  const phoneNumber = formData.get('phoneNumber') as string;
  const email = formData.get('email') as string;
  const setDefaultShippingAddress = formData.get('setDefaultShippingAddress') as string;
  const defaultShippingAddress: boolean = setDefaultShippingAddress === "true";
  const id = generateRandomId();



  return {
    id: '',
    firstName: firstName,
    lastName: lastName,
    streetName: address,
    state: {
      countryIso: 'CHL',
      isocode: 'CHL',
      isocodeShort: 'CHL',
      name: state
    },
    region: {
      uid: id,
      isocode: 'CHL',
      name: region,
    },
    postalCode: zipCode,
    phone: phoneNumber,
    email: email,
    defaultShippingAddress: defaultShippingAddress
  };
};
