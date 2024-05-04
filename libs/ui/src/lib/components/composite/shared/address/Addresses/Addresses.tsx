import { useResponsiveClientValue } from '../../../../../hooks';
import { View } from '../../../../atomic';
import { GenericActionCard } from '../../utils';
import { Address } from '../Address';
import { AddressForm } from '../AddressForm';
import type { AddressesProps } from './Addresses.types';

export const Addresses = (props: AddressesProps) => {
  const { addresses } = props;

  const addCardMessage = addresses?.length > 0
    ? 'Agregar Nueva Direccion'
    : 'Agregar una Direccion';

  return (
    <View direction="row" gap={8}>
      <View.Item columns={useResponsiveClientValue({ l: 4, s: 12 })}>
        <GenericActionCard
          drawerTitle='Agregar Direccion'
          cardLabel={addCardMessage}
        >
          <AddressForm />
        </GenericActionCard>
      </View.Item>
      {addresses?.map((address) => {
        return (
          <View.Item key={address.id} columns={useResponsiveClientValue({ l: 4, s: 12 })}>
            <Address
              address={address}
              isDefault={address.defaultShippingAddress}
              canModify
            />
          </View.Item>
        );
      })}
    </View>
  );
};
