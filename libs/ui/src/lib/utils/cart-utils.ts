/* import type { CartData } from '@ducati/types';
import { CurrencySymbolPosition } from '@ducati/types';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

import type { CartEntryData, PriceData } from '../types';
import type {
  CartProps,
} from '../components';
import { getAddress } from './address-utils';

export class CartUtils {
  static getCart(cart: CartData): CartProps {
    const logger: Logger<ILogObj> = new Logger({ name: 'CartUtils.ts' });
    const cartEntryData: CartEntryData[] = [];

    if (cart === undefined || null) {
      // return null cartProps
      logger.debug('cart is undefined...returning empty CartProps');

      return {
        cart: {
          entries: [],
          code: '',
        },
      };
    }

    if (cart.lineItems) {
      cart.lineItems.forEach((lineItem) => {
        const currentCartEntryData: CartEntryData = {
          entryId: lineItem.id,
          entryNumber: lineItem.entryNumber,
          product: {
            image: {
              src: lineItem.product!.image!.src,
              width: lineItem.product!.image!.width,
              height: lineItem.product!.image!.height,
            },
            productUrl: lineItem.product!.productUrl,
            name: lineItem.product?.name,
            sku: lineItem.product?.sku,
            brand: lineItem.product?.brand,
            price: {
              value: {
                centsAmount: lineItem.basePrice!.value.centsAmount,
                currency: {
                  isocode: 'CHL',
                  name: 'CHL',
                  symbol:'$',
                  symbolPosition: CurrencySymbolPosition.BEFORE,
                  decimalPlaces:
                    lineItem.basePrice!.value.currency.decimalPlaces,
                },
              },
            },
            stock: lineItem.product?.stock,
          },
          quantity: lineItem.quantity,
          totalPrice: lineItem.totalPrice as PriceData,
        };
        cartEntryData.push(currentCartEntryData);
      });
    }

    return {
      cart: {
        code: cart.id,
        poNumber: '', // new field
        user: {
          firstName: cart.customer?.firstName ?? '',
          language: '', // TODO
          lastName: cart.customer?.lastName ?? '',
          name: '', // TODO
          title: '', // TODO
          titleCode: '', // TODO
          code: '', // TODO
          email: cart.customer?.email ?? '',
        },
        shippingAddress: cart.shippingAddress
          ? getAddress(cart.shippingAddress)
          : undefined,
        shippingInfo: {
          shippingMethodId: cart.shippingInfo?.shippingMethod?.id,
          shippingMethodTypeId: cart.shippingInfo?.shippingMethod?.typeId,
          shippingMethodName: cart.shippingInfo?.shippingMethodName,
          shippingMethodPrice: cart.shippingInfo?.price,
        },
        deliveryMode: '', // DeliveryMode type
        deliveryStatus: undefined, // TO DO
        billingAddress: cart.billingAddress
          ? getAddress(cart.billingAddress)
          : undefined,
        totalItems: cart.summary?.totalItems,
        entries: cartEntryData,
      },
    };
  }

}
 */