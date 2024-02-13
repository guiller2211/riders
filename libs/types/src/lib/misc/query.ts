export interface PagedQuery {
  limit?: number;
  offset?: number;
  sort?: string;
  facet?: string[];
}

export interface Results {
  total?: number;
  previousCursor?: number;
  nextCursor?: number;
  count: number;
  facets?: FacetResults;
  query?: unknown;
}

export interface Sort {
  strategy: SortingStrategy;
  input?: string[];
}

export enum SortingStrategy {
  ALPHABETICAL = 'ALPHABETICAL',
  MANUAL = 'MANUAL',
}

export type FacetResult =
  | FilteredFacetResult
  | RangeFacetResult
  | TermFacetResult;

interface FacetResults {
  [key: string]: FacetResult;
}

export type FacetTypes = 'filter' | 'range' | 'terms' | string;

export interface TermFacetResult {
  type: FacetTypes;
  dataType: string;
  missing: number;
  total: number;
  other: number;
  terms: FacetTerm[];
}

interface FacetTerm {
  term: string;
  count: number;
  productCount?: number;
}

export interface RangeFacetResult {
  type: FacetTypes;
  ranges: FacetRange[];
}

export interface FacetRange {
  from: number;
  fromStr: string;
  to: number;
  toStr: string;
  count: number;
  productCount?: number;
  total: number;
  min: number;
  max: number;
  mean: number;
}

export interface FilteredFacetResult {
  type: FacetTypes;
  count: number;
}
