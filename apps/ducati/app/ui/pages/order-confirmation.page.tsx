import { useTypedLoaderData } from 'remix-typedjson';
import { loader } from '../../routes/order-confirmation';
import {
  CheckoutOverview,
  Divider,
  OrderConfirmationHeading,
  OrderConfirmationList,
  OrderSummary,
  View,
  useResponsiveClientValue,
} from '@ducati/ui';

export default function CheckoutConfirmationPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { overview, order } = loaderData;
  
  return (
    <View paddingInline={10}>
      <View
        gap={8}
        direction="column"
        paddingStart={6}
        paddingEnd={6}
        paddingBottom={6}
        justify="center"
        align="center"
        backgroundColor='white'
        borderRadius='large'
      >
        <View maxWidth={200} textAlign="center">
          <OrderConfirmationHeading user={overview.contact} numOrder={overview.numOrder} />
        </View>
        <CheckoutOverview overview={overview} isOrderConfirmationPage />
      </View>

      <View paddingBlock={16} paddingInline={6}>
        <Divider />
      </View>

      <View padding={6} direction="row" gap={19} backgroundColor='white' borderRadius='large'>
        <View.Item columns={useResponsiveClientValue({ s: 12, l: 8 })}>
          <OrderConfirmationList showTitle order={order} />
        </View.Item>
        <View.Item columns={useResponsiveClientValue({ s: 12, l: 4 })}>
          <OrderSummary
            showTitle
            subTotal={order?.totalPrice}
            total={order?.totalPrice}
          />
        </View.Item>
      </View>
    </View>
  );
}
