import { AddressData } from "../types";
import { generateRandomId } from "./generateRandomId-utils";

export const getAddress = (formData: FormData): AddressData => {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const address = formData.get('address') as string;
  const region = formData.get('region') as string;
  const state = formData.get('state') as string;
  const zipCode = formData.get('zipCode') as string;
  const phoneNumber = formData.get('phoneNumber') as string;
  const email = formData.get('email') as string;
  const defaultAddress = formData.get('defaultAddress') as string;
  const defaultShippingAddress: boolean = defaultAddress !== null;
  const id = generateRandomId();

  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    streetName: address,
    communes: {
      idRegion: region,
      isocode: 'es-CL',
      name: state
    },
    region: {
      uid: id,
      isocode: 'es-CL',
      name: region,
    },
    postalCode: zipCode,
    phone: phoneNumber,
    email: email,
    defaultShippingAddress: defaultShippingAddress
  };
};
