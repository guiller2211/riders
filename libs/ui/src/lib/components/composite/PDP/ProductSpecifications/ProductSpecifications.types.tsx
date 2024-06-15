export type ProductSpecificationsProps = {
  defaultActive?: boolean;
  specifications?: ProductSpecificationProps[];
};

export type ProductSpecificationProps = {
  code?: string;
  label?: string;
  value?: string;
};
