import { Badge, Button, Card, Divider, Text, View } from '../../../../atomic';
import { CreditCardIcon } from '../CreditCardIcon';
import type { PaymentMethodProps } from './PaymentMethod.types';

export const PaymentMethod = (props: PaymentMethodProps) => {
  const { method, canModify } = props;
  const isDefault = method.defaultMethod;

  return (
    <Card padding={0} selected={isDefault}>
      <View
        direction="row"
        padding={6}
        backgroundColor={isDefault ? 'primary-faded' : 'white'}
      >
        <View.Item columns={12}>
          <View direction="row" height={48}>
            <View.Item columns={12}>
              <View direction="row">
                <View.Item columns={2}>
                  <CreditCardIcon type={method.type} />
                </View.Item>
                <View.Item columns={11}>
                  {canModify && (
                    <View direction="row" gap={3} align="end" justify="end">
                      {/* TODO: apply menu */}
                    </View>
                  )}
                </View.Item>
                <View.Item columns={12}>
                  <View paddingTop={2} paddingBottom={4}>
                    <Divider />
                  </View>
                </View.Item>
              </View>
            </View.Item>
            <View.Item columns={12}>
              <View
                direction="row"
                gap={1}
                paddingStart={{ s: 0, l: 8 }}
                align="start"
                justify="start"
              >
                <View.Item columns={12}>
                  <View direction="column" gap={1} height={30}>
                    {isDefault && (
                      <View paddingBottom={1}>
                        <Badge color="positive">
                          Privilegiado
                        </Badge>
                      </View>
                    )}
                    {method.expired && (
                      <View paddingBottom={1}>
                        <Badge color="critical">
                          Expiracion
                        </Badge>
                      </View>
                    )}
                    <Text variant="body-2" weight="bold">
                      {method.name}
                    </Text>
                    <Text variant="body-3">
                      Temrinado en {method.ending}
                    </Text>
                    <Text variant="body-3">
                      Expira en {method.month}/
                      {method.year}
                    </Text>
                    <Text variant="body-3">{method.address}</Text>
                  </View>
                </View.Item>
                {!isDefault && !method.expired && canModify ? (
                  <form method="POST">
                    <input type="hidden" name="_action" value="SET_DEFAULT" />
                    <input
                      type="hidden"
                      name="code"
                      value={method.code}
                      readOnly
                    />
                    <View.Item columns={12}>
                      <Button type="submit">
                        Establecer como método de pago predeterminado
                      </Button>
                    </View.Item>
                  </form>
                ) : (
                  <View paddingTop={4} />
                )}
              </View>
            </View.Item>
          </View>
        </View.Item>
      </View>
    </Card>
  );
};
