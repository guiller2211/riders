import {
  IconAmexLight,
  IconDinersLight,
  IconDiscoverLight,
  IconMastercardLight,
  IconPaypalLight,
  IconVisaLight,
  IconCreditCard,
} from '../../../../../icons';
import { Icon } from '../../../../atomic';
import { CreditCardEnum } from './CreditCardEnum';
import type { CreditCardIconProps } from './CreditCardIcon.types';

export const CreditCardIcon = (props: CreditCardIconProps) => {
  const size = {
    width: 'var(--rs-unit-x10)',
    height: 'var(--rs-unit-x5)',
  };
  return (
    <Icon
      svg={CreditCardSVG(props.type)}
      size="medium"
      attributes={{ style: size }}
    />
  );
};

export const CreditCardSVG = (type: CreditCardEnum | string) => {
  switch (type) {
    case CreditCardEnum.Amex:
      return IconAmexLight;
    case CreditCardEnum.Diners:
      return IconDinersLight;
    case CreditCardEnum.Discover:
      return IconDiscoverLight;
    case CreditCardEnum.Mastercard:
    case CreditCardEnum.Mastercard:
    case CreditCardEnum.DebMaster:
      return IconMastercardLight;
    case CreditCardEnum.Paypal:
      return IconPaypalLight;
    case CreditCardEnum.Visa:
    case CreditCardEnum.DebVisa:
      return IconVisaLight;
    default:
      return IconCreditCard;
  }
};
