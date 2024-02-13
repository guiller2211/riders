import type { PagedQuery, Results } from '../misc';
import type { Order } from './order';

export interface OrderQuery extends PagedQuery {
  customerId: string;
  searchTerm?: string;
}

export interface OrderResults extends Results {
  items: Order[];
}

export enum OrderQueryExpansion {
  ORDER_STATE = 'ORDER_STATE',
}
