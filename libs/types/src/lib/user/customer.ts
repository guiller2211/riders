import type { CartData } from '../cart';
import type { User } from './user';

export interface Customer extends User {
  cart?: CartData;
  cartId?: string;
  lastModifiedAt?: string;
}
