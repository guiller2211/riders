import { UIComposedProps } from "@backoffice/types";

export type UserHeaderProps = {
  user: HeaderUserProps;
  navigation: UIComposedProps[];
};

export type HeaderUserProps = {
  name?: string;
  accountNumber?: string;
  navigation?: UIComposedProps[];
  isLoggedIn?: boolean;
  onOpen?: VoidFunction;
};
