import { CartData } from '../types/CartData.types';
import type { OrderData } from '../types/OrderData.types';
import { AddressData } from '../types';
import { CheckoutOverviewProp } from '../components/composite/order';
import { CreditCardEnum } from '../components';

export const getCheckoutOverview = <T extends CartData | OrderData>(
  data: T,
): CheckoutOverviewProp => {
  const getAddress = (address?: AddressData): string => {
    return `${address?.streetNumber} ${address?.streetName}`;
  };

  const getAddress2 = (address?: AddressData): string => {
    return `${address?.city}, ${address?.state?.name ?? ''}, ${
      address?.postalCode ?? ''
    }`;
  };

  return {
    contact: {
      email: data.user?.email ?? '',
      firstName: data.user?.firstName ?? '',
      lastName: data.user?.lastName ?? '',
    },
    shipping: {
      address: getAddress(data.shippingAddress),
      address2: getAddress2(data.shippingAddress),
    },
    paid: {
      type: data.paymentInfo?.type ?? CreditCardEnum.Visa,
      name: data.paymentInfo?.billingName ?? '',
      ending: data.paymentInfo?.ccNoEnding ?? '',
      month: data.paymentInfo?.expMonth ?? '',
      year: data.paymentInfo?.expYear ?? '',
    },
    method: {
      method: data.shippingInfo?.shippingMethodName ?? '',
    },
  };
};
