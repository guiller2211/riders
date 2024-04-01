import type { PagedQuery, Results } from '../misc';
import type { CategoryData } from './category';

/* export interface CategoryQuery extends PagedQuery {
  ids?: string[];
  name?: string;
  slug?: string;
  ancestorSystemIds?: string[] | null;
} */

export enum CategoryEnum {
  NUEVO = 'ANCESTORS',
  Seminuevo = 'CHILDREN',
}

export interface CategoryResults extends Results {
  items: CategoryData[];
}
