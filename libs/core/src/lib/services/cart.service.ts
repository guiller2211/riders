import type {
  AddToCartAction,
  Cart,
  CartAction,
  CartSummary,
  RemoveLineItemAction,
  Session,
  SetCartEmailAction,
  SetShippingAddressAction,
  SetShippingMethodAction,
  ShippingMethod,
  UpdateLineQuantityAction,
} from '@ducati/types';

import { AbstractService } from './service';

export abstract class CartService extends AbstractService {
  static TYPE = 'cartService';

  protected constructor(type?: string) {
    super(type ?? CartService.TYPE);
  }

  abstract getCartById(session: Session, id: string): Promise<Cart | null>;

  abstract getCartSummary(
    session: Session,
    id: string,
  ): Promise<CartSummary | null>;

  abstract createCart(session: Session): Promise<Cart>;

  abstract addToCart(session: Session, action: AddToCartAction): Promise<Cart>;

  abstract updateLineQuantity(
    session: Session,
    action: UpdateLineQuantityAction,
  ): Promise<Cart>;

  abstract removeLineItem(
    session: Session,
    action: RemoveLineItemAction,
  ): Promise<Cart>;

  abstract setCartEmail(
    session: Session,
    action: SetCartEmailAction,
  ): Promise<Cart>;

  abstract setShippingAddress(
    session: Session,
    action: SetShippingAddressAction,
  ): Promise<Cart>;

  abstract setShippingMethod(
    session: Session,
    action: SetShippingMethodAction,
  ): Promise<Cart>;

  abstract getAvailableShippingMethods(
    session: Session,
  ): Promise<ShippingMethod[]>;

  abstract executeActions(
    session: Session,
    ...actions: CartAction[]
  ): Promise<Cart>;
}
