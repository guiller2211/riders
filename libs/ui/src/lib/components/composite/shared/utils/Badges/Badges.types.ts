import { BackgroundColors } from "../../../../../utils";

export type BadgesProps = {
  badges: BadgeProps[];
}
export type BadgeProps = {
  color: BackgroundColors;
  message: string;
}
