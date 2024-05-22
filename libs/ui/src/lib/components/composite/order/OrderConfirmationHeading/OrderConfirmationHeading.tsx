import { Text, View } from 'reshaped';
import type { OrderConfirmationHeadingProps } from './OrderConfirmationHeading.types';
import { useResponsiveClientValue } from '../../../../hooks';

const OrderConfirmationHeading = (props: OrderConfirmationHeadingProps) => {
  const { user, numOrder } = props;
  return (
    <View
      gap={8}
      direction="column"
      paddingTop={useResponsiveClientValue({ s: 6, l: 16 })}
      paddingBottom={8}
      maxWidth={200}
      textAlign="center"
      justify="center"
    >
      <Text variant="featured-1" weight="bold">
        Nº Pedido: {numOrder}
      </Text>

      <Text variant="featured-1" weight="bold">
        Gracias {user.firstName} {user.lastName}
      </Text>

      <View>
        <Text variant="body-2">
          {user.email}
        </Text>
        <Text variant="body-2">
          Si el correo electrónico no ha llegado, verifique su carpeta de correo no deseado para ver si el correo electrónico fue enviado allí.
        </Text>
      </View>
    </View>
  );
};

export default OrderConfirmationHeading;