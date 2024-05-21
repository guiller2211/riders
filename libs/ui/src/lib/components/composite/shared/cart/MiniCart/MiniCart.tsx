import { AppRoutes, CartData, CartEntry, UIComposedProps } from '@ducati/types';


import { View, Text } from '../../../../atomic';

import type { MiniCartProps } from './MiniCart.types';
import { Drawer, DrawerActionsButtons, DrawerContent, DrawerFooter, DrawerHeader } from '../../utils';
import { CartEmpty, CartEntries, CartEntry as CartEntryComponent } from '../../../cart';
import { Price } from '../../price';

function getEmptyCartData(): UIComposedProps {
  return {
    link: { props: { href: '/' } },
    image: {
      desktop: { src: '/assets/images/cart/d_cartItems.png' },
      mobile: { src: '/assets/images/cart/m_cartItems.png' },
    },
  };
}

const MiniCartEmpty = (props: { open: boolean; onClose: VoidFunction }) => {
  const { open, onClose } = props;

  return (
    <Drawer active={open} onClose={onClose}>
      <DrawerHeader
        title="Vacio"
        onClose={onClose}
      />
      <DrawerContent>
        <CartEmpty data={getEmptyCartData()} isMiniCart />
      </DrawerContent>
    </Drawer>
  );
};

const ViewCart = (props: {
  open: boolean;
  cart: CartData;
  onClose: VoidFunction;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
}) => {
  const { cart, open, onClose, handleAction } = props;

  return (
    <View>
      {cart?.entries.length > 0 ? (
        <Drawer active={open} onClose={onClose}>
          <DrawerHeader
            title="Mi carrito"
            onClose={onClose}
          />
          <DrawerContent direction="column">
            <CartEntries 
            viewCart="MiniCart" 
            entries={cart?.entries} 
            handleAction={handleAction}/>
          </DrawerContent>
          <DrawerFooter gap={4} direction="row">
            <Text variant="body-1" weight="bold">
              subtotal
            </Text>
            <View.Item gapBefore="auto">
              <Text variant="body-1" weight="bold">
                <Price
                  locale={cart.totalPrice?.value?.currency.isocode}
                  text={{
                    color: 'neutral',
                    weight: 'bold',
                    variant: 'body-1',
                  }}
                  value={cart.totalPrice?.value}
                />
              </Text>
            </View.Item>
            <DrawerActionsButtons
              primaryHref={AppRoutes.CheckoutShipping}
              primaryLabel="Chekout"
              secondaryHref={AppRoutes.Cart}
              secondaryLabel="Ver carrito"
            />
          </DrawerFooter>
        </Drawer>
      ) : (
        <MiniCartEmpty open={open} onClose={onClose} />
      )}
    </View>
  );
};

const AddCart = (props: {
  open: boolean;
  onClose: VoidFunction;
  product: CartEntry;
}) => {
  const { open, product, onClose } = props;

  return (
    <Drawer active={open} onClose={onClose}>
      <DrawerHeader
        title="Agregar al Carrito"
        onClose={onClose}
      />
      <DrawerContent direction="column">
        <CartEntryComponent entry={product} viewCart="RecentlyAdded" />
      </DrawerContent>
      <DrawerFooter>
        <DrawerActionsButtons
          primaryHref={AppRoutes.CheckoutShipping}
          primaryLabel="Chekout"
          secondaryHref={AppRoutes.Cart}
          secondaryLabel="Ver carrito"
        />
      </DrawerFooter>
    </Drawer>
  );
};

const MiniCart = (props: MiniCartProps) => {
  const { cart, open, onClose, isAdd, product, handleAction } = props;
  const isViewingCart =
    !isAdd && cart && cart.entries && cart.entries.length > 0;
  const isCartEmpty =
    !isAdd && (!cart || !cart.entries || cart.entries.length === 0);

  return (
    <View>
      {isAdd && product && (
        <AddCart product={product} open={open} onClose={onClose} />
      )}
      {isViewingCart && <ViewCart cart={cart} open={open} onClose={onClose} handleAction={handleAction}/>}
      {isCartEmpty && <MiniCartEmpty open={open} onClose={onClose} />}
    </View>
  );
};
export default MiniCart;
