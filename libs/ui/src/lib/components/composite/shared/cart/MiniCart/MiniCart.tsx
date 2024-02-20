import { AppRoutes, UIComposedProps } from '@ducati/types';

import { useTranslation } from '../../../../../hooks';
import type { CartData, CartEntryData } from '../../../../../types';

import { View, Text } from '../../../../atomic';

import type { MiniCartProps } from './MiniCart.types';
import { Drawer, DrawerActionsButtons, DrawerContent, DrawerFooter, DrawerHeader } from '../../utils';
import { CartEmpty, CartEntries, CartEntry } from '../../../cart';

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
  const translate = useTranslation();

  return (
    <Drawer active={open} onClose={onClose}>
      <DrawerHeader
        title={translate('miniCart.empty.countCart')}
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
}) => {
  const { cart, open, onClose } = props;
  const translate = useTranslation();

  return (
    <View>
      {cart?.entries.length > 0 ? (
        <Drawer active={open} onClose={onClose}>
          <DrawerHeader
            title={translate('miniCart.countCart', 'layout', {
              count: `${cart?.entries.length || 0}`,
            })}
            onClose={onClose}
          />
          <DrawerContent direction="column">
            <CartEntries viewCart="MiniCart" entries={cart?.entries} />
          </DrawerContent>
          <DrawerFooter gap={4} direction="row">
            <Text variant="body-1" weight="bold">
              {translate('miniCart.subtotal', 'layout')}
            </Text>
            <View.Item gapBefore="auto">
              <Text variant="body-1" weight="bold">
                $1000.000
              </Text>
            </View.Item>
            <DrawerActionsButtons
              primaryHref={AppRoutes.CheckoutShipping}
              primaryLabel={translate('miniCart.actions.checkout', 'layout')}
              secondaryHref={AppRoutes.Cart}
              secondaryLabel={translate('miniCart.actions.viewCart', 'layout')}
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
  product: CartEntryData;
}) => {
  const { open, product, onClose } = props;
  const translate = useTranslation();

  return (
    <Drawer active={open} onClose={onClose}>
      <DrawerHeader
        title={translate('miniCart.title', 'layout')}
        onClose={onClose}
      />
      <DrawerContent direction="column">
        <CartEntry entry={product} viewCart="RecentlyAdded" />
        <Text variant="body-2">{translate('miniCart.edit', 'layout')}</Text>
      </DrawerContent>
      <DrawerFooter>
        <DrawerActionsButtons
          primaryHref={AppRoutes.CheckoutShipping}
          primaryLabel={translate('miniCart.actions.checkout', 'layout')}
          secondaryHref={AppRoutes.Cart}
          secondaryLabel={translate('miniCart.actions.viewCart', 'layout')}
        />
      </DrawerFooter>
    </Drawer>
  );
};

const MiniCart = (props: MiniCartProps) => {
  const { cart, open, onClose, isAdd, product } = props;
  const isViewingCart =
    !isAdd && cart && cart.entries && cart.entries.length > 0;
  const isCartEmpty =
    !isAdd && (!cart || !cart.entries || cart.entries.length === 0);

  return (
    <View>
      {isAdd && product && (
        <AddCart product={product} open={open} onClose={onClose} />
      )}
      {isViewingCart && <ViewCart cart={cart} open={open} onClose={onClose} />}
      {isCartEmpty && <MiniCartEmpty open={open} onClose={onClose} />}
    </View>
  );
};
export default MiniCart;
