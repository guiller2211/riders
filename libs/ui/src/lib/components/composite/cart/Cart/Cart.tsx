import { IconWarning } from '../../../../icons';
import { View, Text, Alert } from '../../../atomic';
import CartEntries from '../CartEntries';
import type { CartProps } from './Cart.types';

const Cart = (props: CartProps) => {
  const { cart } = props;
  return (
    <View direction={{ s: 'column', l: 'row' }} gap={{ s: 12, l: 2 }}>
      <View.Item columns={12}>
        <View
          divided
          borderColor="neutral"
          padding={2}
          direction="column"
          borderRadius="small"
          width="auto"
        >
          <View.Item>
            <View direction="row" padding={3}>
              <Text variant="body-1" weight="bold">
                Items 2
              </Text>
            </View>
          </View.Item>
          <View.Item>
            <View padding={6}>
              <CartEntries viewCart={undefined} entries={cart.entries} />
            </View>
          </View.Item>
        </View>
        <Alert icon={IconWarning} color="critical" bleed={0}>
            alerta
        </Alert>
      </View.Item>
    </View>
  );
};
export default Cart;
