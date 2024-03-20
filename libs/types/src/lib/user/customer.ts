import type { Cart } from '../cart';
import type { User } from './user';

export interface Customer extends User {
  cart?: Cart;
  cartId?: string;
  lastModifiedAt?: string;
}
