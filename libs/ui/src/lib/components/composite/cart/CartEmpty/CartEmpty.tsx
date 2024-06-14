import { Button, Icon, Text, View } from '../../../atomic';
import { useResponsiveClientValue } from '../../../../hooks';
import { IconCart, IconFilter } from '../../../../icons';
import type { CartEmptyProps } from './CartEmpty.types';
import { AppRoutes } from '@riders/types';

const CartEmpty = (props: CartEmptyProps) => {
  const { data, isMiniCart } = props;

  return (
    <View>
      {!isMiniCart ? (
        <View align='center'>
          <View
            direction='column'
            gap={5}
            borderRadius="small"
            backgroundColor='white'
            align='center'
            padding={10}
            width={useResponsiveClientValue({ s: undefined, l: 100 })}
          >
            <Text variant="featured-1" weight="bold">
              Vacio
            </Text>
            <Icon svg={IconFilter} size={10} />

            {data.link?.props && (
              <View paddingTop={8}>
                <Button
                  size="xlarge"
                  color="black"
                  href={AppRoutes.Category}
                >
                  volver
                </Button>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View direction="column" gap={6} paddingTop={useResponsiveClientValue({ l: 12 })}>
          <View.Item columns={12}>
            <View align="center">
              <Icon svg={IconCart} size={20} />
            </View>
          </View.Item>

          <View.Item columns={12}>
            <View align="center">
              <View
                paddingBottom={1}
                paddingStart={useResponsiveClientValue({ s: 13, l: 0 })}
                paddingEnd={useResponsiveClientValue({ s: 13, l: 0 })}
              >
                <Text variant="featured-2" align="center" weight="bold">
                  Mini carrito
                </Text>
              </View>
              <Text variant="featured-3" align="center">
                Mini carrito
              </Text>
              {data.link?.props && (
                <View paddingTop={8}>
                  <Button
                    size="xlarge"
                    color="black"
                    href={AppRoutes.Category}
                  >
                    continuar
                  </Button>
                </View>
              )}
            </View>
          </View.Item>
        </View>
      )}
    </View>
  );
};

export default CartEmpty;
