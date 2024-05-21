import { useState } from 'react';
import type { TextProps } from 'reshaped';
import { CartEntry as CartEntryData, TypeVariamEnum } from '@ducati/types';

import type { CartEntryProps, CartActionsProps } from './CartEntry.types';
import {
  Divider,
  Icon,
  Image,
  Link,
  Loader,
  Text,
  View,
} from '../../../atomic';
import { IconCheckCircle } from '../../../../icons';
import { Loading, Price, QuantityCounter } from '../../shared';
import DeleteFromCart from '../../shared/cart/DeleteFromCart/DeleteFromCart';
import { useResponsiveClientValue } from '../../../../hooks';

const CartEntry = (props: CartEntryProps) => {
  const { entry, handleAction } = props;
  switch (props.viewCart) {
    case 'RecentlyAdded':
      return <AddMiniCart entry={entry} />;
    case 'MiniCart':
      return <ViewMiniCart entry={entry} handleAction={handleAction} />;
    case 'ReadOnly':
      return <CartReadOnly entry={entry} />;
    default:
      return <CartEntryCard entry={entry} handleAction={handleAction} />;
  }
};

const CartReadOnly = (props: { entry: CartEntryData }) => {
  const { entry } = props;
  return (
    <View direction="row" gap={{ s: 5, l: 6 }} paddingBlock={6}>
      <View.Item columns={{ s: 3, l: 2 }}>
        <ProductImage entry={entry} />
      </View.Item>
      <View.Item columns={{ s: 9, l: 10 }}>
        <View direction={{ s: 'column', l: 'row' }} gap={3}>
          <View.Item grow>
            <ProductInfo entry={entry} />
          </View.Item>
          <View.Item>
            <ProductPrice entry={entry} />
          </View.Item>
        </View>
      </View.Item>
    </View>
  );
};

const CartEntryCard = (props: CartActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { entry } = props;
  const [entryData, setEntryData] = useState(entry);

  const updateCartEntry = async (entryId: string, quantity: number) => {
    setIsLoading(true);

    if (props.handleAction) {
      if (quantity != 0) {
        const data = await props.handleAction('update', entryId, quantity)
        data && setEntryData(data);
      } else {
        deleteCartEntry(entryId)
      }
      setIsLoading(false);
    }
  };

  const deleteCartEntry = async (entryId: string) => {
    setIsLoading(true);
    if (props.handleAction) {
      await props.handleAction('delete', entryId)
      setIsLoading(false);
    }
  };

  const image = entry.product?.image?.find((_i) => _i.default)
  const MAX_QTY = 1000;

  return (
    <View
      direction="row"
      gap={useResponsiveClientValue({ s: 4, l: 12 })}
      paddingBlock={5}
      paddingInline={0}
    >
      <View.Item columns={useResponsiveClientValue({ s: 12, l: 7 })}>
        <View direction="row">
          <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
            <Link href={"/product/" + entry?.id}>
              <Image
                src={image?.url}
                height={35}
                width="auto"
              />
            </Link>
          </View.Item>
          <View.Item columns={useResponsiveClientValue({ s: 12, l: 6 })}>
            <View direction="column">
              <Text variant="body-3">
                <Link
                  href={"/product/" + entry.product?.id}
                  variant="underline"
                >
                  {entry.product?.sku}
                </Link>
              </Text>

              <Text variant="body-2" weight="bold">
                <Link
                  href={"/product/" + entry.id}
                  variant="plain"
                  color="inherit"
                >
                  {entry.product?.name}
                </Link>
              </Text>

              <Text variant="body-3">
                sku: {entry.product?.sku}
              </Text>

              <View.Item>
                {entry.product?.stock && (
                  <View
                    direction="row"
                    gap={3}
                    paddingTop={15}
                    align="center"
                  >
                    <View.Item>
                      <Icon svg={IconCheckCircle} color="positive" />
                    </View.Item>
                    <View.Item>
                      disponibles {entry.product?.stock?.quantity}
                    </View.Item>
                  </View>
                )}
              </View.Item>
            </View>
          </View.Item>
        </View>
      </View.Item>

      <View.Item columns={useResponsiveClientValue({ s: 12, l: 5 })}>
        <View direction="row">
          <View.Item columns={useResponsiveClientValue({ s: 4, l: 6 })}>
            <View
              direction="column"
              paddingBlock={3}
              paddingInline={0}
              maxWidth={useResponsiveClientValue({ s: '31.25rem', l: '6.25rem' })}
              gap={3}
            >
              <View.Item>
                <QuantityCounter
                  name="quantity"
                  qty={entry.quantity}
                  min={1}
                  max={
                    entry.product?.stock?.quantity
                      ? entry.product?.stock.quantity
                      : MAX_QTY
                  }
                  step={1}
                  changed={(value) => updateCartEntry(entry.product?.sku!, value)}
                  showInPlp
                />
              </View.Item>

              <View.Item columns={12}>
                <DeleteFromCart
                  entryId={entry.entryId!}
                  quantity={entry.quantity}
                  variant="ghost"
                  color="primary"
                  isButtom
                  onClick={() => deleteCartEntry(entry.product?.sku!)}
                />
              </View.Item>
            </View>
          </View.Item>

          <View.Item columns={useResponsiveClientValue({ s: 8, l: 6 })}>
            <View paddingBlock={3} paddingInline={0}>
              {isLoading ? (
                <Loader />
              ) : (
                <ProductPrice entry={entryData} />
              )}
            </View>
          </View.Item>

        </View>
      </View.Item>
    </View>

  );
};
const AddMiniCart = (props: { entry: CartEntryData }) => {
  const { entry } = props;
  return (
    <View direction="column" paddingBlock={6} gap={6}>
      <MiniCartProductCard entry={entry} />
      <Divider />
    </View>
  );
};

const ViewMiniCart = (props: CartActionsProps) => {
  const { entry } = props;
  const quantity = entry.quantity ?? 0;
  const [isLoading, setIsLoading] = useState(false);
  const deleteCartEntry = async (entryId: string) => {
    setIsLoading(true);
    if (props.handleAction) {
      await props.handleAction('delete', entryId)
      setIsLoading(false);
    }
  };

  return (
    <View direction="row" paddingBlock={6} gap={6}>
      <View.Item grow>
        <MiniCartProductCard entry={entry} />
      </View.Item>
      <View.Item>
        {
          isLoading ?
            <Loading />
            :
            <DeleteFromCart
              isMiniCart
              entryId={entry.entryId!}
              quantity={quantity}
              variant="outline"
              onClick={() => deleteCartEntry(entry.product?.sku!)}
            />
        }
      </View.Item>
    </View>
  );
};

const MiniCartProductCard = (props: { entry: CartEntryData }) => {
  const { entry } = props;
  return (
    <View direction="row" gap={4}>
      <View.Item columns={3}>
        <ProductImage entry={entry} />
      </View.Item>
      <View.Item columns={9}>
        <View gap={3}>
          <ProductInfo entry={entry} />
          <ProductPrice entry={entry} />
        </View>
      </View.Item>
    </View>
  );
};

const ProductImage = (props: { entry: CartEntryData }) => {
  const { entry } = props;
  const image = entry.product?.image?.find(_product => _product.default == true);

  if (!image) {
    return null;
  }

  return (
    <Link href={"/product/" + entry.id}>
      <Image src={image.url} height="auto" width="auto" />
    </Link>
  );
};
const ProductInfo = (props: { entry: CartEntryData }) => {
  const { entry } = props;
  return (
    <View direction="column">
      <View paddingBottom={1}>
        <Text variant="body-2" weight="bold">
          <Link
            href={"/product/" + entry?.id}
            variant="plain"
            color="inherit"
          >
            {entry.product?.name}
          </Link>
        </Text>
      </View>
      <Text variant="body-3">
        sku: {entry.product?.sku}
      </Text>
      <Text variant="body-3">
        canidad {entry.quantity}
      </Text>
      {entry.product?.variants
        ?.filter(_c => _c.type === TypeVariamEnum.Color)
        .map((_c, index) => (
          <Text key={index} variant="body-3">
            Color {_c.name}
          </Text>
        ))}
      {entry.product?.variants?.filter(_s => _s.type === TypeVariamEnum.Size)
        .map((_s, index) => (
          <Text key={index} variant="body-3">
            Talla {_s.name}
          </Text>
        ))}
    </View>
  );
};

const ProductPrice = (props: { entry: CartEntryData }) => {
  const { entry } = props;

  const priceText: TextProps = {
    color: 'neutral',
    weight: 'bold',
    variant: 'body-1',
  };
  const eachPriceText: TextProps = {
    color: 'neutral',
    weight: 'medium',
    variant: 'body-3',
  };
  return (
    <View>
      <View gap={1} direction="row" align="center">
        <View.Item>
          <Price
            locale={entry.totalPrice?.value?.currency.isocode}
            text={eachPriceText}
            value={entry.product?.value}
            discount={entry.discounts?.value}
          />
        </View.Item>
        <View.Item>
          <Text variant="body-3" weight='medium' color='neutral'>
            Precio
          </Text>
        </View.Item>
      </View>
      <View gap={1} direction="row" align="center">
        <View.Item>
          <Price
            locale={entry.totalPrice?.value?.currency.isocode}
            text={priceText}
            value={entry.totalPrice?.value}
            discount={entry.discounts?.value}
          />
        </View.Item>
        <View.Item>
          <Text variant="body-1" weight='bold' color='neutral'>
            total
          </Text>
        </View.Item>
      </View>
    </View>
  );
};

export default CartEntry;
