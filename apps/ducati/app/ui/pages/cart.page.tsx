import {
  Card,
  Cart,
  CartEmpty,
  CartHeader,
  useResponsiveClientValue,
  View,
  OrderSummary,
  Loading
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import { loader } from '../../routes/cart';
import { useState } from 'react';
import { addItemToCart, deleteEntryBySku } from '../../service/cart.data.service';
import { CartEntry } from '@ducati/types';

const CartPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { cart } = loaderData;
  const renderCart = cart?.id !== '' && cart?.entries.length! > 0;
  const [isLoading, setIsLoading] = useState(false);
  const [getCart, setCart] = useState(cart);

  const handleAction = async (action: 'update' | 'delete', entryId: string, quantity?: number): Promise<CartEntry | void> => {
    let updatedCart;
    try {
      setIsLoading(true);
      if (cart) {
        switch (action) {
          case 'update':
            const { cartItem, cartUpdate } = await addItemToCart(cart!, quantity!, entryId, true);
            setCart(cartUpdate);
            return cartItem;
          default:
            const cartUpdateDelete = await deleteEntryBySku(cart, entryId);
            setCart(cartUpdateDelete)
            break;
        }
      } else {
        throw new Error("El carrito no está disponible");
      }
    } catch (error) {
      console.error("Error al ejecutar la acción:", error);
    } finally {
      setIsLoading(false);
    }
    return updatedCart;
  };


  return (
    <View gap={10} padding={useResponsiveClientValue({ s: 10, l: 20 })}>

      <CartHeader totalItems={cart?.entries.length ?? 0} />

      {renderCart ? (
        <View
          direction={useResponsiveClientValue({ s: 'column-reverse', l: 'row' })}
          paddingTop={5}
          align="stretch"
          gap={10}
        >
          <View.Item columns={useResponsiveClientValue({ s: 12, l: 8 })}>
            <Cart
              cart={getCart!}
              handleAction={handleAction} />
          </View.Item>

          <View.Item columns={useResponsiveClientValue({ s: 12, l: 4 })}>
            {
              isLoading ?
                <View align='center'>
                  <Loading />
                </View>
                :
                <Card padding={8}>
                  <OrderSummary
                    subTotal={getCart?.totalPrice}
                    total={getCart?.totalPrice}
                    showTitle
                  />
                </Card>
            }
          </View.Item>
        </View>
      ) : (
        <CartEmpty data={{ link: { props: { href: '/' } } }} />
      )}
    </View>
  );
};

export default CartPage;
