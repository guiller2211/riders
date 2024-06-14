import { useResponsiveClientValue } from 'reshaped';
import { IconHeart } from '../../../icons';
import { View, Link, Image, Text, Popover, Button } from '../../atomic';
import type { ProductCardForPLPProps } from './index';
import { AppRoutes } from '@riders/types';
import { useAuth } from '../../../context';
import { useNavigate } from 'react-router-dom';

export const ProductCardForPLP = (props: ProductCardForPLPProps) => {
  const { product, sendForm, isLoading } = props;
  const image = product.image?.find((_image) => _image.default)
  const { auth } = useAuth();
  const navigate = useNavigate()
  const likeProduct = () => {
    auth?.currentUser && sendForm ? sendForm(`${product.id}`) : navigate(AppRoutes.Login)
  }
  return (
    <View
      direction="column"
      padding={6}
      borderColor="neutral"
      borderRadius="medium"
      backgroundColor="neutral"
      gap={5}
    >
      <Link href={`${AppRoutes.Product}/${product.id}`}>
        <Image
          displayMode="contain"
          src={image?.url}
          height={70}
          width="100%"
        />
      </Link>

      <Text variant="body-2" weight="bold" maxLines={2}>
        <Popover triggerType="hover">
          <Popover.Trigger>
            {(attributes: any) => (
              <Link href={"/product/" + product.id} attributes={attributes} variant="plain" color="inherit">
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

      <Text variant="body-3">Precio:  {product.value
        ? product.value.centsAmount
        : ''}</Text>


      <Button
        size='xlarge'
        color="primary"
        icon={IconHeart}
        onClick={likeProduct}
        loading={isLoading}
        fullWidth>
        Favorito
      </Button>

    </View>
  );
};
