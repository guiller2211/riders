import { FormEvent } from "react";

export type AddressesProps = {
  addresses: any[];
  sendForm?: (form: FormEvent<HTMLFormElement>) => void;
  deleteAddress?: (uid: string) => void;
};
