import { FormEvent } from "react";

export type FormUserProps = {
    isLoading?: boolean;
    sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
