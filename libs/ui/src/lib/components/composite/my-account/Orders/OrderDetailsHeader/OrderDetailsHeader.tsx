import { Badge, Button, Icon, Link, Text, View } from '../../../../atomic';
import { IconArrowLeft } from '../../../../../icons';
import type { OrderDetailsHeaderProps } from './OrderDetailsHeader.types';
import { useResponsiveClientValue } from '../../../../../hooks';

const OrderDetailsHeader = (props: OrderDetailsHeaderProps) => {
  const { order } = props;

  return (
    <View direction={useResponsiveClientValue({ s: 'column', m: 'row' })} gap={6}>
      <View.Item>
        <View direction="row" gap={3} align="center" justify="center">
          <View.Item>
            <Link color="primary" href="/my-account/orders">
              <Icon svg={IconArrowLeft} size={8} />
            </Link>
          </View.Item>
          <View.Item>
            <Text variant="featured-1">
              Numero de orden: {order?.code}
            </Text>
          </View.Item>
          <View.Item>
            {/* {order?.orderStatus && (
              <Badge color={order.orderStatus} rounded>
                <Text variant="caption-1">{order.orderStatus.name}</Text>
              </Badge>
            )} */}
          </View.Item>
        </View>
      </View.Item>

      <View.Item gapBefore="auto">
        <View direction="row" gap={4}>
          <View.Item>
            <Button color="primary" size="large" fullWidth>
              Reordenar
            </Button>
          </View.Item>
          <View.Item>
            <Button variant="outline" size="large" fullWidth>
              Mirar la factura
            </Button>
          </View.Item>
        </View>
      </View.Item>
    </View>
  );
};

export default OrderDetailsHeader;
