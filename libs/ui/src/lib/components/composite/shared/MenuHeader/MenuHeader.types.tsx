import { UIComposedProps } from "@riders/types";
import { HeaderUserProps } from "@riders/ui";

export type MenuHeaderProps = {
  navigation: UIComposedProps[];
  userMenu?: UIComposedProps[];
  user: HeaderUserProps;
}