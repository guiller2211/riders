import { AppRoutes } from '@riders/types';

import { Link, Text, View, Divider } from 'reshaped';

import type { CheckoutOverviewProps } from './CheckoutOverview.types';
import OrderConfirmationContact from '../OrderConfirmationContact';
import OrderConfirmationPaid from '../OrderConfirmationPaid';
import OrderConfirmationBillToShipTo from '../OrderConfirmationBillToShipTo';
import OrderConfirmationShippingMethod from '../OrderConfirmationShippingMethod';
import { useResponsiveClientValue } from '../../../../hooks';

const CheckoutOverview = (props: CheckoutOverviewProps) => {
  const { overview, isOrderConfirmationPage } = props;

  return (
    <View>
      {isOrderConfirmationPage ? (
        <View direction="row" align="center" gap={useResponsiveClientValue({ s: 3, l: 8 })}>
          <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
            <View
              paddingBlock={6}
              paddingInline={8}
              gap={3}
              borderRadius="small"
              borderColor="neutral"
            >
              <Text variant="body-3" weight="bold">
                Contacto:
              </Text>
              <OrderConfirmationContact
                firstName={overview?.contact.firstName}
                lastName={overview?.contact.lastName}
                email={overview?.contact.email}
                phone={overview?.contact.phone}
                addresses={overview?.contact.addresses}
              />
            </View>
          </View.Item>

          <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
            <View
              paddingBlock={6}
              paddingInline={8}
              gap={3}
              borderRadius="small"
              borderColor="neutral"
            >
              <Text variant="body-3" weight="bold">
                Envio a:
              </Text>
              <View direction="row">
                <View.Item>
                  <OrderConfirmationBillToShipTo
                    address={overview?.shipping.address}
                    address2={overview?.shipping.address2}
                    region={overview?.shipping.region}
                    commune={overview?.shipping.commune}
                  />
                </View.Item>
              </View>
            </View>
          </View.Item>

          <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
            <View
              paddingBlock={6}
              paddingInline={8}
              gap={3}
              borderRadius="small"
              borderColor="neutral"
            >
              <Text variant="body-3" weight="bold">
                Pagado con:
              </Text>
              <OrderConfirmationPaid
                name={overview?.paid.name}
                ending={overview?.paid.ending}
                type={overview?.paid.type}
              />
            </View>
          </View.Item>



          <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
            <View
              paddingBlock={6}
              paddingInline={8}
              gap={3}
              borderRadius="small"
              borderColor="neutral"
            >
              <Text variant="body-3" weight="bold">
                Metodo de Envio
              </Text>
              <View direction="row">
                <View.Item>
                  <OrderConfirmationShippingMethod
                    method={overview?.method.method}
                  />
                </View.Item>
              </View>
            </View>
          </View.Item>
        </View>
      ) : (
        <View borderRadius="small" borderColor="neutral">
          <View paddingBlock={6} paddingInline={8}>
            <View
              gap={3}
              direction={{ s: 'column', l: 'row' }}
              paddingBottom={4}
            >
              <View.Item columns={{ s: 12, l: 2 }}>
                <Text variant="body-1" color="disabled">
                  Contacto
                </Text>
              </View.Item>
              <View.Item columns={{ s: 12, l: 8 }}>
                <View direction={{ s: 'column', l: 'row' }}>
                  <View.Item>
                    <View paddingEnd={2}>
                      <Text variant="body-2" weight="bold">
                        {overview?.contact.firstName} {overview?.contact.lastName}
                      </Text>
                    </View>
                  </View.Item>
                  <View.Item>
                    <Text variant="body-1"> {overview?.contact.email}</Text>
                  </View.Item>
                </View>
              </View.Item>
            </View>
            <View paddingBottom={5}>
              <Divider />
            </View>
            <View
              gap={3}
              direction={{ s: 'column', l: 'row' }}
              paddingBottom={4}
            >
              <View.Item columns={{ s: 12, l: 2 }}>
                <Text variant="body-1" color="disabled">
                  Envi
                </Text>
              </View.Item>
              <View.Item columns={{ s: 12, l: 8 }}>
                <View direction="row">
                  <View.Item>
                    <Text variant="body-1">
                      {overview?.shipping.address} {overview?.shipping.address2}
                    </Text>
                  </View.Item>
                </View>
              </View.Item>
              <View.Item columns={{ s: 12, l: 2 }} gapBefore="auto">
                <Link href={AppRoutes.CheckoutShipping}>
                  Envio a:
                </Link>
              </View.Item>
            </View>
            <View paddingBottom={5}>
              <Divider />
            </View>
            <View
              gap={3}
              direction={{ s: 'column', l: 'row' }}
              paddingBottom={4}
            >
              <View.Item columns={{ s: 12, l: 2 }}>
                <Text variant="body-1" color="disabled">
                  Metodo de Pago:
                </Text>
              </View.Item>
              <View.Item columns={{ s: 12, l: 8 }}>
                <View direction="row">
                  <View.Item>
                    <Text variant="body-1">{overview?.method.method} </Text>
                  </View.Item>
                </View>
              </View.Item>
              <View.Item columns={{ s: 12, l: 2 }} gapBefore="auto">
                <Link href={AppRoutes.CheckoutShipping}>
                  Cambiar
                </Link>
              </View.Item>
            </View>
            <View paddingBottom={5}>
              <Divider />
            </View>
            <View
              gap={3}
              direction={{ s: 'column', l: 'row' }}
              paddingBottom={4}
            >
              <View.Item columns={{ s: 12, l: 2 }}>
                <Text variant="body-1" color="disabled">
                  Pagado con:
                </Text>
              </View.Item>

              <View.Item columns={{ s: 12, l: 8 }}>
                <View direction="row">
                  <View.Item>
                    <View paddingEnd={2}>
                      <Text variant="body-2" weight="bold">
                        {overview?.paid.type
                          ? overview?.paid.type
                          : 'Cuenta'
                        }
                      </Text>
                    </View>
                  </View.Item>
                  {/* <View.Item>
                    <Text
                      variant='body-1'>{translate('overview?.endingIn', 'checkoutReviewOrder', { num: overview?.paid.ending })} </Text>
                  </View.Item>
                  <View.Item>
                    <Text variant='body-1'>{translate('overview?.expires', 'checkoutReviewOrder', {
                      month: overview?.paid.month,
                      year: overview?.paid.year
                    })}
                    </Text>
                  </View.Item> */}
                </View>
              </View.Item>
              <View.Item columns={{ s: 12, l: 2 }} gapBefore="auto">
                <Link href={AppRoutes.CheckoutPayment}>
                  Cambiar
                </Link>
              </View.Item>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CheckoutOverview;
