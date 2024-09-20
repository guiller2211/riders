import { TextProps } from 'reshaped';
import { IconEyeFill, IconHeart } from '../../../icons';
import { View, Link, Image, Text, Popover, Button } from '../../atomic';
import type { ProductCardForPLPProps } from './index';
import { AppRoutes, CartEntry } from '@riders/types';
import { useAuth } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerHeader, ImageGallery, Price } from '../shared';
import { useIsMobile } from '../../../utils';
import { ProductRating } from '../product';
import { useOpenState } from '../../../hooks';
import { FormEvent, useState } from 'react';

export const ProductCardForPLP = (props: ProductCardForPLPProps) => {
  const { isGridView, product, isLoading, sendForm } = props;
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();
  const isMobile = useIsMobile();

  const priceText: TextProps = {
    color: 'neutral',
    weight: 'bold',
    variant: 'featured-2',
  };
  const image = product.image?.find((_image) => _image.default)
  const { auth } = useAuth();
  const navigate = useNavigate()

  const likeProduct = () => {
    auth?.currentUser && sendForm ? sendForm(`${product.id}`) : navigate(AppRoutes.Login)
  }

  return (
    <View>
      {isGridView ? (
        <View
          direction="column"
          padding={6}
          borderColor="neutral"
          borderRadius="medium"
          backgroundColor="neutral"
          gap={3}
        >
          <Link href={`${AppRoutes.Product}/${product.id}`}>
            <Image
              {...product.image}
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
                  <Link
                    attributes={attributes}
                    href={`${AppRoutes.Product}/${product.id}`}
                    variant="plain"
                    color="inherit"
                  >
                    {product.name}
                  </Link>
                )}
              </Popover.Trigger>
              <Popover.Content>
                <View>{product.name}</View>
              </Popover.Content>
            </Popover>
          </Text>

          <Text variant="body-3">
            SKU: {product.sku}{' '}
          </Text>

          <Text variant="body-3">
            Stock: {product.stock?.quantity} {' '}
          </Text>

          <ProductRating total={321} average={4.4} />

          <Price
            text={priceText}
            locale={product.value?.currency.isocode}
            value={product.value}
          />

          <Button
            size='xlarge'
            color="primary"
            variant="solid"
            type="submit"
            onClick={onOpenDrawerHandler}
            fullWidth
            icon={IconEyeFill}
          >
            Vista Rapida
          </Button>

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
      ) : (
        <View
          direction={isMobile ? 'column' : 'row'}
          padding={6}
          borderColor="neutral"
          gap={isMobile ? 0 : 8}
          backgroundColor="neutral"
        >
          <View.Item columns={isMobile ? 12 : 9}>
            <View direction="row" gap={isMobile ? 4 : 8}>
              <View.Item columns={isMobile ? 12 : 4}>
                <Link href={`${AppRoutes.Product}/${product.id}`}>
                  <Image
                    {...product.image}
                    displayMode="contain"
                    src={image?.url}
                    height={70}
                    width="100%"
                  />
                </Link>
              </View.Item>
              <View.Item columns={isMobile ? 12 : 8}>
                <Text variant="body-2" weight="bold">
                  <Link
                    href={`${AppRoutes.Product}/${product.id}`}
                    variant="plain"
                    color="inherit"
                  >
                    {product.name}
                  </Link>
                </Text>
                <Text variant="body-3">
                  SKU: {product.sku}{' '}
                </Text>
                <Text variant="body-3">
                  Stock: {product.stock?.quantity} {' '}
                </Text>
                <ProductRating total={321} average={4.4} />
                <Price
                  text={priceText}
                  locale={product.value?.currency.isocode}
                  value={product.value}
                  badgesOnTop
                />
              </View.Item>
            </View>
          </View.Item>

          <View.Item columns={isMobile ? 12 : 3}>
            <View direction='column' gap={3}>
              <Button
                size='xlarge'
                color="primary"
                variant="solid"
                type="submit"
                onClick={onOpenDrawerHandler}
                fullWidth
                icon={IconEyeFill}
              >
                Vista Rapida
              </Button>
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
          </View.Item>
        </View>
      )}
      <Drawer active={open} onClose={onCloseDrawerHandler} position='center' size="60rem">
        <DrawerHeader
          title='Galeria'
          onClose={onCloseDrawerHandler}
        />
        <DrawerContent padding={0}>
          <View direction="row" gap={5} backgroundColor='page' padding={8} borderRadius='large'>
            <ImageGallery images={product.image} />

          </View>
        </DrawerContent>

      </Drawer>
    </View>
  );
};
