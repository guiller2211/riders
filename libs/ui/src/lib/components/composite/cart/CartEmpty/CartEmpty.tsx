import { Button, Hidden, Icon, Image, Text, View } from '../../../atomic';
import { useResponsiveClientValue, useTranslation } from '../../../../hooks';
import { IconCart } from '../../../../icons';
import type { CartEmptyProps } from './CartEmpty.types';

const CartEmpty = (props: CartEmptyProps) => {
  const { data, isMiniCart } = props;
  const translate = useTranslation();

  return (
    <View>
      {!isMiniCart ? (
        <View
          direction={useResponsiveClientValue({ s: 'column', l: 'row' })}
          gap={useResponsiveClientValue({ s: 6, m: 34 })}
          paddingTop={12}
        >
          <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
            <View
              paddingTop={useResponsiveClientValue({ m: 0, l: 36 })}
              align={useResponsiveClientValue({ m: 'center', l: 'start' })}
            >
              <View paddingBottom={1}>
                <Text variant="featured-1" weight="bold">
                  {translate('cart.empty.title', 'cart')}
                </Text>
              </View>
              <Text variant="featured-3" align={useResponsiveClientValue({ s: 'center', m: 'start' })}>
                {translate('cart.empty.sub_title', 'cart')}
              </Text>
              {data.link?.props && (
                <View paddingTop={8}>
                  <Button
                    size="xlarge"
                    color="black"
                    href={data.link.props.href}
                  >
                    {translate('cart.actions.back_home', 'cart')}
                  </Button>
                </View>
              )}
            </View>
          </View.Item>
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
                  {translate('miniCart.empty.title', 'layout')}
                </Text>
              </View>
              <Text variant="featured-3" align="center">
                {translate('miniCart.empty.sub_title', 'layout')}
              </Text>
              {data.link?.props && (
                <View paddingTop={8}>
                  <Button
                    size="xlarge"
                    color="black"
                    href={data.link.props.href}
                  >
                    {translate('miniCart.empty.actions.continue', 'layout')}
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
