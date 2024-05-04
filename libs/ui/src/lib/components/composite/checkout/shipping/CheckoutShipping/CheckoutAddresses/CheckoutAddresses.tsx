import { useEffect, useMemo, useState } from 'react';

import {
  GenericCarousel,
  CarouselItem,
} from '../../../../shared/';
import type { CheckoutAddressesProps } from './CheckoutAddresses.types';
import CheckoutAddressCard from '../CheckoutAddressCard';
import type { AddressData } from '../../../../../../types/AddressData.types';
import {
  getDefault,
  filterListByProperty,
  findById,
} from '../../../../../../utils';

const CheckoutAddresses = ({ addresses, onChangeAddress, ...rest }: CheckoutAddressesProps) => {
  const defaultShippingAddress = useMemo(() => getDefault('defaultShippingAddress', addresses), [addresses]);
  const [shippingAddress, setShippingAddress] = useState(defaultShippingAddress);

  const filteredShippingAddresses = useMemo(
    () => filterListByProperty('shippingAddress', true, addresses),
    [addresses]
  );

  const onChangeHandler = async (address: AddressData) => {
    await onChangeAddress(address);
    setShippingAddress(address);
  };

  if (!addresses?.length) return null;

  return (
    <GenericCarousel
      value={shippingAddress}
      onChange={onChangeHandler}
      {...rest}
    >
      {filteredShippingAddresses.map((address) => (
        <CarouselItem key={address.id} value={address}>
          <CheckoutAddressCard
            address={address}
            isSelected={shippingAddress?.id === address.id}
          />
        </CarouselItem>
      ))}
    </GenericCarousel>
  );
};

export default CheckoutAddresses;
