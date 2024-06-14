import { useState, useEffect } from 'react';

import { Button, View, TextField, Hidden } from '../../../../atomic';
import { useOpenState } from '../../../../../hooks';
import MiniCart from '../MiniCart';
import type { AddToCartProps } from './AddToCart.types';
import { QuantityCounter } from '../../utils';
import { CartEntry } from '@riders/types';
import { useNavigation } from '@remix-run/react';

const AddToCart = (props: AddToCartProps) => {
  const {
    productCode,
    stockAvailable,
    min,
    quantityValue = 1,
    showInPlp,
    sendForm,
    result,
    variant
  } = props;
  const [quantity, setQuantity] = useState(quantityValue);
  const navigation = useNavigation();
  const [cartEntryData, setCartEntry] = useState<CartEntry>();
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();
  const [available, setAvailable] = useState(true);
  const changedQuantity = (value: number) => {
    setQuantity(value);
  };

  useEffect(() => {
    if (result) {
      onOpenDrawerHandler();
      setCartEntry(result);
    }
  
    if (variant && variant.every(v => v !== undefined)) {
      setAvailable(false);
    }
  }, [result, variant]);
  
  return (
    <form onSubmit={sendForm}>
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
          {variant?.map((_v, index) => (
            _v && (
              <div key={index}>
                <TextField name={`type-${index}`} defaultValue={_v.type} />
                <TextField name={`variant-${index}`} defaultValue={_v.name} />
              </div>
            )
          ))}
          
        </Hidden>
        <View.Item grow>
          <Button
            size='xlarge'
            color="primary"
            variant="solid"
            type="submit"
            fullWidth
            disabled={available}
            loading={navigation.state === 'idle' ? false : true}
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
