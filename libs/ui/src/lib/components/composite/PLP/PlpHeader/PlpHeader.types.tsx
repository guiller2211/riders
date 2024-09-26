import { CategoryData } from "@riders/types";
import { ViewProps } from "../../../atomic";

export type PlpHeaderProps = {
  categoryName?: string;
  category?: CategoryData;
} & ViewProps;
