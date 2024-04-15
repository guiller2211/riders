import { Customer, ProductData } from "@backoffice/types";
import { FormEvent } from "react";

export type FormProductProps = {
    data: ProductData;
    isLoading?: boolean;
    sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
