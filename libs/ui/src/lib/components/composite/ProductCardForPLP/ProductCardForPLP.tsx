import { View, Link, Image, Text, Popover } from '../../atomic';
import type { ProductCardForPLPProps } from './index';

export const ProductCardForPLP = (props: ProductCardForPLPProps) => {
  const { product } = props;
  
  return (
    <View
      direction="column"
      padding={6}
      borderColor="neutral"
      borderRadius="medium"
      backgroundColor="neutral"
    >
      <View>
        <Link>
          <Image
            displayMode="contain"
            src={product.images?.url}
            height={70}
            width="100%"
          />
        </Link>
      </View>
      <View paddingTop={6} paddingBottom={1} height={20}>
        <Text variant="body-2" weight="bold" maxLines={2}>
          <Popover triggerType="hover">
            <Popover.Trigger>
              {(attributes: any) => (
                <Link attributes={attributes} variant="plain" color="inherit">
                  {product.name}
                </Link>
              )}
            </Popover.Trigger>
            <Popover.Content>
              <View>{product.name}</View>
            </Popover.Content>
          </Popover>
        </Text>
      </View>

      <View>
        <Text variant="body-3">1234</Text>
      </View>

      <View paddingBlock={6} paddingInline={0}>
        {product.price && product.price.value && product.price.value.currency
          ? product.price.value.currency.symbol
          : ''}
      </View>
    </View>
  );
};
