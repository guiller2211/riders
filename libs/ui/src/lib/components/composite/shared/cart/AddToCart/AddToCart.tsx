import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

import { Button, View, TextField, Hidden } from '../../../../atomic';
import { useOpenState } from '../../../../../hooks';
import MiniCart from '../MiniCart';
import type { AddToCartProps } from './AddToCart.types';
import { QuantityCounter } from '../../utils';
import { CartEntry } from '@ducati/types';

const AddToCart = (props: AddToCartProps) => {
  const {
    productCode,
    stockAvailable,
    min,
    quantityValue = 1,
    showInPlp,
    sendForm,
    isLoading,
    result
  } = props;
  const [quantity, setQuantity] = useState(quantityValue);

  const [cartEntryData, setCartEntry] = useState<CartEntry>();
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();
  const [state, setEstate] = useState(false);
  const changedQuantity = (value: number) => {
    setQuantity(value);
  };

  useEffect(() => {
    if (result) {
      onOpenDrawerHandler();
      setCartEntry(result);
    }
  }, [result]);

  const sendAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const p = await sendForm(e);
  };



  return (
    <form onSubmit={sendAddProduct}>
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

        <Hidden hide>
          <TextField name="productCode" defaultValue={productCode} />
        </Hidden>

        <View.Item grow>
          <Button
            size='xlarge'
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
        </View.Item>
      </View>
    </form>
  );
};
export default AddToCart;
