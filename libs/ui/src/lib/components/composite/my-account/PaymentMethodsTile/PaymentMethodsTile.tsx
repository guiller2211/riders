import { IconArrowRight, IconCreditCard } from '../../../../icons';
import { Button, Card, Icon, Text, View } from '../../../atomic';

const PaymentMethodsTile = () => {

  return (
    <Card padding={6}>
      <View direction="row" gap={3}>
        <View.Item columns="auto">
          <Icon svg={IconCreditCard} color="primary" size="medium" />
        </View.Item>
        <View.Item columns={10}>
          <View height={33}>
            <View paddingBottom={3}>
              <Text color="primary" variant="featured-3" weight="bold">
                Metodo de Pago
              </Text>
            </View>
            <View paddingBottom={3}>
              <Text variant="body-3">
                Guarde y administre sus datos de pago para un pago rápido.
              </Text>
            </View>
          </View>
          <View>
            <Button
              variant="ghost"
              color="primary"
              href="/my-account/payment-methods"
              endIcon={IconArrowRight}
            >
              Tus pagos
            </Button>
          </View>
        </View.Item>
      </View>
    </Card>
  );
};
export default PaymentMethodsTile;
