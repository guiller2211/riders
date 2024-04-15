import type { CartHeaderProps } from './CartHeader.types';
import { Button, Text, View } from '../../../atomic';

const CartHeader = (props: CartHeaderProps) => {
  const { totalItems } = props;
  return (
    <View direction="row" gap={10}>
      <View.Item columns={{ s: 12, l: 8 }}>
        <Text variant="featured-1">carrito</Text>
      </View.Item>

      {totalItems > 0 && (
        <View.Item columns={{ s: 12, l: 4 }}>
          <Button
            fullWidth
            color="positive"
            size="xlarge"
            href="/checkout/shipping"
          >
            seguir checkout
          </Button>
        </View.Item>
      )}
    </View>
  );
};

export default CartHeader;
