import { useResponsiveClientValue } from 'reshaped';
import { IconCart, IconHeart } from '../../../icons';
import { View, Link, Image, Text, Popover, Button } from '../../atomic';
import type { ProductCardForPLPProps } from './index';
import { AddToCart } from '../shared';

export const ProductCardForPLP = (props: ProductCardForPLPProps) => {
  const { product, sendForm, isLoading} = props;

  return (
    <View
      direction="column"
      padding={6}
      borderColor="neutral"
      borderRadius="medium"
      backgroundColor="neutral"
      gap={5}
    >
      <Link href={"/" + product.type + "/" + product.id}>
        <Image
          displayMode="contain"
          src={product.image?.url}
          height={70}
          width="100%"
        />
      </Link>

      <Text variant="body-2" weight="bold" maxLines={2}>
        <Popover triggerType="hover">
          <Popover.Trigger>
            {(attributes: any) => (
              <Link href={"/product/" + product.sku} attributes={attributes} variant="plain" color="inherit">
                {product.name}
              </Link>
            )}
          </Popover.Trigger>
          <Popover.Content>
            <View>{product.name}</View>
          </Popover.Content>
        </Popover>
      </Text>

      <Text variant="body-3">SKU: {product.sku}</Text>
      
      <Text variant="body-3">Precio:  {product.price && product.price.value && product.price.value.currency
        ? product.price.value.currency.symbol
        : ''}</Text>


      <View direction={useResponsiveClientValue({ s: 'column', l: 'row' })} gap={5}>

        <View.Item columns={12}>

          {product?.sku && (
            <AddToCart productCode={product?.sku} stockAvailable={230} sendForm={sendForm} isLoading={isLoading}/>
          )}
        </View.Item>
        <Button size='xlarge' color="primary" icon={IconHeart} fullWidth>
          Favorito
        </Button>

      </View>


    </View>
  );
};
