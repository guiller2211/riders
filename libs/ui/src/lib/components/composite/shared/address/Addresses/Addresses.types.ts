import { FormEvent } from "react";
import type { AddressData } from '../../../../../types';

export type AddressesProps = {
  addresses: any[];
  sendForm?: (form: FormEvent<HTMLFormElement>) => void;
  selectDefault?: (addressFormData: AddressData) => void;
  deleteAddress?: (uid: string) => void;
};
