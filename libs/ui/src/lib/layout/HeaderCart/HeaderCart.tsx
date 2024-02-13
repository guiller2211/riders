import { Button, Text, View } from '../../components/atomic';
import { IconCart } from '../../icons';
import type { HeaderCartProps } from './HeaderCart.types';

export const HeaderCart = (props: HeaderCartProps) => {
  const { isCheckout } = props;

  return (
    <View
      direction="row"
      backgroundColor="neutral-faded"
      borderRadius="circular"
      width={18}
      align="center"
    >
      {isCheckout ? (
        <Button variant="solid" color="inherit" size="large" icon={IconCart} />
      ) : (
        <Button variant="solid" color="inherit" size="large" icon={IconCart} />
      )}
      <Text variant="body-2" weight="medium">
        0
      </Text>
    </View>
  );
};
