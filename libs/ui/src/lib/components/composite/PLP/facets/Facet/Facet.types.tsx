import { FacetValuesProps } from "../FacetValues";

export type FacetProps = {
  name: string;
  values: FacetValuesProps[];
  visibleLimit?: number;
  isOpen?: boolean;
};
