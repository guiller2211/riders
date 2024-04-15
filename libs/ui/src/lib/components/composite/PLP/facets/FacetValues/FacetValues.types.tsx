export type FacetValuesProps = {
  name: string;
  selected?: boolean;
  quantity?: number;
  visible?: boolean;
  type: FacetValueTypeEnum;
};

export const enum FacetValueTypeEnum {
  Link = 'Link',
  Checkbox = 'Checkbox',
}
