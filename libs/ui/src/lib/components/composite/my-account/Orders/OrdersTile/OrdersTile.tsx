import { Button, Card, Icon, Text, View } from '../../../../atomic';
import { IconArrowRight, IconClockHistory } from '../../../../../icons';
import { AppRoutes } from '@riders/types';

const OrdersTile = () => {
  
  return (
    <Card padding={6}>
      <View direction="row" gap={3}>
        <View.Item columns="auto">
          <Icon svg={IconClockHistory} color="primary" size="medium" />
        </View.Item>
        <View.Item columns={10}>
          <View height={33}>
            <View paddingBottom={3}>
              <Text color="primary" variant="featured-3" weight="bold">
                Ordenes
              </Text>
            </View>
            <View paddingBottom={3}>
              <Text variant="body-3">
              Realiza un seguimiento de tus compras recientes y ve pedidos anteriores con facilidad.
              </Text>
            </View>
          </View>
          <View>
            <Button
              variant="ghost"
              href={AppRoutes.Orders}
              color="primary"
              endIcon={IconArrowRight}
            >
              Tus ordenes
            </Button>
          </View>
        </View.Item>
      </View>
    </Card>
  );
};
export default OrdersTile;
