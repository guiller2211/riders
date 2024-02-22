import { UIComposedProps } from "@ducati/types";

export type UserProps = {
  user: HeaderUserProps;
};

export type HeaderUserProps = {
  name?: string;
  accountNumber?: string;
  navigation?: UIComposedProps[];
  isLoggedIn?: boolean;
  onOpen?: VoidFunction;
};
