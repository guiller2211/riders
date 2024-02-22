import { useState } from 'react';
import type { FormEvent } from 'react';

import { Button, View } from '../../../../atomic';
import { useOpenState } from '../../../../../hooks';
import MiniCart from '../MiniCart';
import type { CartEntryData } from '../../../../../types';
import type { AddToCartProps } from './AddToCart.types';
import { QuantityCounter } from '../../utils';

const AddToCart = (props: AddToCartProps) => {
  const {
    productCode,
    stockAvailable,
    min,
    quantityValue = 1,
    showInPlp,
  } = props;
  const [quantity, setQuantity] = useState(quantityValue);
  const [isLoading, setIsLoading] = useState(false);

  const [cartEntryData, setCartEntry] = useState<CartEntryData>();
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();

  const changedQuantity = (value: number) => {
    setQuantity(value);
  };
  const sendAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

  };

  return (
    <View gap={6} direction={showInPlp ? 'row' : 'column'}>
      <View.Item>
        <QuantityCounter
          name="addToCartQuantity"
          step={1}
          min={min! >= 0 ? min! : 1}
          max={stockAvailable}
          size="large"
          changed={changedQuantity}
          sizeField={showInPlp ? 'xlarge' : 'large'}
          showInPlp={showInPlp}
          showIcon
        />
      </View.Item>
      <View.Item grow>
        <form onSubmit={sendAddProduct}>
          <Button
            size={showInPlp ? 'xlarge' : 'large'}
            color="primary"
            variant="solid"
            type="submit"
            fullWidth
            loading={isLoading}
          >
            Agregar
          </Button>
          <MiniCart
            onClose={onCloseDrawerHandler}
            open={open}
            isAdd
            product={cartEntryData}
          />
        </form>
      </View.Item>
    </View>
  );
};
export default AddToCart;
