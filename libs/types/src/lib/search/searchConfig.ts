export interface SearchConfig {
  product: ProductSearchConfig;
  order: OrderSearchConfig;
}

export interface ProductSearchConfig {
  sort: SortConfig;
  facets: Facet[];
}

export interface OrderSearchConfig {
  sort: SortConfig;
}

export interface SortConfig {
  by: SortBy;
  direction: SortDirection[];
}

export interface SortBy {
  field: SortField[];
  variants?: SortField[];
}

export interface SortField {
  key: string;
  value?: string | SortField[];
}

export interface SortDirection {
  key: string;
  value: string;
  variants?: SortDirection[];
}

export enum FacetType {
  Term = 'terms',
  Range = 'range',
  Filtered = 'filtered',
}

export interface Facet {
  type: FacetType;
  key: string;
  expression: string;
}
