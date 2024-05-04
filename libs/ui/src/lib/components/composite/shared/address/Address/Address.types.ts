import type { AddressData } from '../../../../../types';

export type AddressProps = {
  address: AddressData;
  canModify?: boolean;
  isDefault?: boolean;
  isSelected?: boolean;
};
