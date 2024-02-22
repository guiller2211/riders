import { useState } from 'react';
import type { TextProps } from 'reshaped';

import type { CartEntryProps } from './CartEntry.types';
import {
  Divider,
  Hidden,
  Icon,
  Image,
  Link,
  Loader,
  Text,
  View,
} from '../../../atomic';
import type { CartEntryData } from '../../../../types';
import { IconCheckCircle } from '../../../../icons';
import { QuantityCounter } from '../../shared';
import DeleteFromCart from '../../shared/cart/DeleteFromCart/DeleteFromCart';

const CartEntry = (props: CartEntryProps) => {
  const { entry } = props;
  switch (props.viewCart) {
    case 'RecentlyAdded':
      return <AddMiniCart entry={entry} />;
    case 'MiniCart':
      return <ViewMiniCart entry={entry} />;
    case 'ReadOnly':
      return <CartReadOnly entry={entry} />;
    default:
      return <CartEntryCard entry={entry} />;
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
const CartEntryCard = (props: { entry: CartEntryData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateCartEntry = (value: number) => {
    setIsLoading(true);
  };

  const priceText: TextProps = {
    color: 'neutral',
    weight: 'bold',
    variant: 'featured-2',
  };
  const MAX_QTY = 1000;
  return (
    <View direction="column">
      <View.Item>
        <View
          direction="row"
          gap={{ s: 4, l: 12 }}
          paddingBlock={5}
          paddingInline={0}
        >
          <View.Item columns={{ s: 12, l: 7 }}>
            <View direction="row">
              <View.Item columns={{ s: 12, l: 6 }}>
                <Link href={props.entry.product?.productUrl}>
                  <Image
                    {...props.entry.product?.image}
                    height={35}
                    width="auto"
                  />
                </Link>
              </View.Item>
              <View.Item columns={{ s: 12, l: 6 }}>
                <View direction="column">
                  <View paddingBlock={3} paddingInline={0}>
                    <Text variant="body-3">
                      <Link
                        href={props.entry.product?.productUrl}
                        variant="underline"
                      >
                        {props.entry.product?.brand}
                      </Link>
                    </Text>
                  </View>

                  <Text variant="body-2" weight="bold">
                    <Link
                      href={props.entry.product?.productUrl}
                      variant="plain"
                      color="inherit"
                    >
                      {props.entry.product?.name}
                    </Link>
                  </Text>

                  <Text variant="body-3">
                   sku: 123
                  </Text>

                  <View.Item>
                    <Hidden hide={{ s: true, l: false }}>
                      {props.entry.product?.stock ? (
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
                           disponibles 4
                          </View.Item>
                        </View>
                      ) : (
                        <View
                          direction="row"
                          gap={2}
                          paddingTop={15}
                          align="center"
                        >
                          <View.Item>
                            <Icon svg={IconCheckCircle} />
                          </View.Item>
                          <View.Item>
                           disponible en 2 febrero
                          </View.Item>
                        </View>
                      )}
                    </Hidden>
                  </View.Item>
                </View>
              </View.Item>
            </View>
          </View.Item>

          <View.Item columns={{ s: 12, l: 5 }}>
            <View direction="row">
              <View.Item columns={{ s: 4, l: 6 }}>
                <View
                  direction="column"
                  paddingBlock={3}
                  paddingInline={0}
                  maxWidth={{ s: '31.25rem', l: '6.25rem' }}
                  gap={3}
                >
                  <View.Item>
                    <QuantityCounter
                      name="quantity"
                      qty={props.entry.quantity}
                      min={1}
                      max={
                        props.entry.product?.stock
                          ? props.entry.product?.stock
                          : MAX_QTY
                      }
                      step={1}
                      changed={(value) => updateCartEntry(value)}
                      showInPlp
                    />
                  </View.Item>

                  <View.Item columns={12}>
                    <Hidden hide={{ s: true, l: false }}>
                      <DeleteFromCart
                        entryId={props.entry.entryId}
                        quantity={props.entry.quantity}
                        variant="ghost"
                        color="primary"
                      />
                    </Hidden>
                  </View.Item>
                </View>
              </View.Item>

              <View.Item columns={{ s: 8, l: 6 }}>
                <View paddingBlock={3} paddingInline={0}>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <ProductPrice entry={props.entry} />
                  )}
                </View>
              </View.Item>

              <View.Item columns={12}>
                <Hidden hide={{ s: false, l: true }}>
                  <View direction="row" gap={4}>
                    <View.Item columns={12}>
                      {props.entry.product?.stock ? (
                        <View direction="row" gap={3} align="center">
                          <View.Item>
                            <Icon svg={IconCheckCircle} color="positive" />
                          </View.Item>
                          <View.Item>
                            disponible 4
                          </View.Item>
                        </View>
                      ) : (
                        <View direction="row" gap={2} align="center">
                          <View.Item>
                            <Icon svg={IconCheckCircle} />
                          </View.Item>
                          <View.Item>
                            disponible 2 febrero
                          </View.Item>
                        </View>
                      )}
                    </View.Item>
                    <View.Item columns={12}>
                      <DeleteFromCart
                        entryId={props.entry.entryId}
                        quantity={props.entry.quantity}
                        variant="ghost"
                        color="primary"
                        isButtom
                      />
                    </View.Item>
                  </View>
                </Hidden>
              </View.Item>
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
const ViewMiniCart = (props: { entry: CartEntryData }) => {
  const { entry } = props;
  const quantity = entry.quantity ?? 0;
  return (
    <View direction="row" paddingBlock={6} gap={6}>
      <View.Item grow>
        <MiniCartProductCard entry={entry} />
      </View.Item>
      <View.Item>
        <DeleteFromCart
          isMiniCart
          entryId={entry.entryId}
          quantity={quantity}
          variant="outline"
        />
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
  return (
    <Link href={entry.product?.productUrl}>
      <Image {...entry.product?.image} height="auto" width="auto" />
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
            href={entry.product?.productUrl}
            variant="plain"
            color="inherit"
          >
            {entry.product?.name}
          </Link>
        </Text>
      </View>
      <Text variant="body-3">
       sku: 123
      </Text>
      <Text variant="body-3">
      canidad 5
      </Text>
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
          $1000.000
        </View.Item>
        <View.Item>
          <Text variant="body-3">
            total 
          </Text>
        </View.Item>
      </View>
      <View gap={1} direction="row" align="center">
        <View.Item>
          $1000.000
        </View.Item>
        <View.Item>
          <Text variant="body-3">
            precio 
          </Text>
        </View.Item>
      </View>
    </View>
  );
};

export default CartEntry;
