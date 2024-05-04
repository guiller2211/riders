import { useResponsiveClientValue } from '../../../../hooks';
import { IconWarning } from '../../../../icons';
import { View, Text, Alert } from '../../../atomic';
import CartEntries from '../CartEntries';
import type { CartProps } from './Cart.types';

const Cart = (props: CartProps) => {
  const { cart, handleAction} = props;
  return (

    <View
      divided
      padding={6}
      borderRadius="small"
      direction='column'
      gap={useResponsiveClientValue({ s: 12, l: 2 })}
      backgroundColor='white'
    >
      <Text variant="body-1" weight="bold">
        Items {cart.entries.length}
      </Text>
      <CartEntries
        viewCart={undefined}
        entries={cart.entries}
        handleAction={handleAction}/>
    </View>


  );
};
export default Cart;
