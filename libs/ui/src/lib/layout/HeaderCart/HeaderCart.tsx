import { MiniCart } from '../../components';
import { Button, Text, View } from '../../components/atomic';
import { useOpenState } from '../../hooks';
import { IconCart } from '../../icons';
import type { HeaderCartProps } from './HeaderCart.types';

export const HeaderCart = (props: HeaderCartProps) => {
  const { isCheckout, cart } = props;
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();

  return (
    <View
      direction="row"
      backgroundColor="warning"
      borderRadius="circular"
      width={18}
      align="center"
    >
      {isCheckout ? (
        <Button variant="solid" color="inherit" size="large" onClick={onOpenDrawerHandler}
          icon={IconCart} />
      ) : (
        <Button variant="solid" color="inherit" size="large" onClick={onOpenDrawerHandler}
          icon={IconCart} />
      )}
      <MiniCart open={open} onClose={onCloseDrawerHandler} cart={cart}/>
      <Text variant="body-2" weight="medium">
        {cart ? cart?.entries.length : 0}
      </Text>
    </View>
  );
};
