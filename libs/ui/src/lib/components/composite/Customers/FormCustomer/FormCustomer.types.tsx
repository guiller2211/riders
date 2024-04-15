import { Customer } from "@backoffice/types";
import { FormEvent } from "react";

export type FormCustomerProps = {
    data: Customer;
    isLoading?: boolean;
    sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
