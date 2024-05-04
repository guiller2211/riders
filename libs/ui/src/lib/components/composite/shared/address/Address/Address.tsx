import { AppRoutes } from '@ducati/types';

import { IconPencil } from '../../../../../icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Link,
  Text,
  View,
} from '../../../../atomic';
import type { AddressProps } from './Address.types';

export const Address = (props: AddressProps) => {
  const { address, canModify, isSelected } = props;
  const isDefaultAddress = address.defaultShippingAddress;
  const firstNameInitial = (address?.firstName ?? '').charAt(0);
  const lastNameInitial = (address?.lastName ?? '').charAt(0);

  return (
    <Card padding={0} selected={isSelected}>
      <View
        direction="row"
        padding={6}
        backgroundColor={isDefaultAddress ? 'primary-faded' : 'white'}
      >
        <View.Item columns={12}>
          <View direction="row" gap={8}>
            <View.Item columns={12}>
              <View direction="row">
                <View.Item columns={1}>
                  <Avatar
                    initials={firstNameInitial + lastNameInitial}
                    color="primary"
                    variant={isDefaultAddress ? undefined : 'faded'}
                    squared
                  />
                </View.Item>
                <View.Item columns={11}>
                  {canModify ? (
                    <View direction="row" gap={3} align="end" justify="end">
                      {/* TODO: apply menu */}
                    </View>
                  ) : (
                    <View direction="row" gap={3} align="end" justify="end">
                      <Button
                        icon={IconPencil}
                        size="large"
                        variant="ghost"
                        color="primary"
                      />
                    </View>
                  )}
                </View.Item>
              </View>
            </View.Item>

            <View.Item columns={12}>
              <View direction="row" gap={1} align="start" justify="start">
                <View.Item columns={12}>
                  <View direction="column" gap={1} height={23}>
                    {isDefaultAddress && (
                      <View paddingBottom={1}>
                        <Badge color="primary" variant="outline">
                          Por Defecto
                        </Badge>
                      </View>
                    )}
                    <View>
                      <Text variant="body-2" weight="bold">
                        {address.firstName} {address.lastName}
                      </Text>
                    </View>
                    <Text variant="body-3">
                      {address.streetNumber} {address.streetName}{' '}
                      {address?.line1} {address?.line2}
                    </Text>
                    <Text variant="body-3">
                      {address.city}, {address.state?.isocode}{' '}
                      {address.postalCode}
                    </Text>
                  </View>
                </View.Item>
                {!isDefaultAddress && canModify ? (
                  <form method="POST">
                    <input type="hidden" name="_action" value="SET_DEFAULT" />
                    <input
                      type="hidden"
                      name="code"
                      value={address.id}
                      readOnly
                    />
                    <View.Item columns={12}>
                      <Link type="submit" href={AppRoutes.Home}>
                        Seleccionar por Defecto
                      </Link>
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
