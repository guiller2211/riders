import type { FocusEvent } from 'react';
import { useState } from 'react';

import { IconDash, IconPlus } from '../../../../../icons';
import { View, Icon, TextField, Link, Popover } from '../../../../atomic';
import type { QuantityCounterProps } from './QuantityCounter.types';
import type { TextFieldProps } from '../../../../atomic';

const QuantityCounter = (props: QuantityCounterProps) => {
  const { min: minValue = 1, max: maxValue = 0, step = 1 } = props;


  // TODO: useFormik
  const [quantity, setQuantity] = useState(props.qty ? props.qty : minValue);
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(false);

  const quantityChanged = (quantity: number) => {
    if (isNaN(quantity)) {
      return;
    }
    if (quantity <= minValue && minValue > 1) {
      setMessage(
        "minimo",
      );
      setIsActive(true);
    } else if (quantity > maxValue) {
      setMessage(
        "maximo",
      );
      setIsActive(true);
    } else {
      setIsActive(false);
      setQuantity(quantity);
      props.changed(quantity);
    }
  };

  const onBlurQuantityHandler = ((event: FocusEvent<HTMLInputElement>) =>
    quantityChanged(Number(event.target.value))) as TextFieldProps['onBlur'];
  const onChangedQuantityHandler: TextFieldProps['onChange'] = (args) =>
    args.event && quantityChanged(Number(args.event.target.value));
  const onClickQuantityPlusHandler = () => quantityChanged(quantity + step);
  const onClickQuantityLessHandler = () => quantityChanged(quantity - step);

  return (
    <View
      direction="row"
      borderColor="neutral"
      borderRadius="small"
      align="center"
      width={props.showInPlp ? (!props.showIcon ? 14 : 32) : undefined}
      height={
        props.showInPlp && props.size === 'large'
          ? 14
          : props.showInPlp
            ? 9
            : undefined
      }
    >
      {props.showIcon && (
        <View.Item columns={props.showInPlp ? 3 : 2}>
          <Link
            disabled={Number(quantity) <= minValue}
            onClick={onClickQuantityLessHandler}
          >
            <View width={8} align="center" justify="center">
              <Icon svg={IconDash} size={6} />
            </View>
          </Link>
        </View.Item>
      )}
      <View.Item
        columns={props.showInPlp ? 6 : 8}
        attributes={props.showIcon ? undefined : { style: { width: '100%' } }}
      >
        {props.showIcon ? (
          <TextField
            name={props.name}
            value={`${quantity}`}
            attributes={{
              style: {
                fontSize:
                  props.size === 'large'
                    ? 'var(--rs-font-size-body-2)'
                    : 'var(--rs-font-size-body-3)',
                border: 0,
                padding: 0,
                boxShadow: 'none',
              },
            }}
            inputAttributes={{
              style: { textAlign: 'center' },
            }}
            onChange={onChangedQuantityHandler}
            size={props.sizeField}
          />
        ) : (
          /* On cart page, use defaultValue with onBlue to only send update cart request when user is done editing qty */
          <Popover position="top" active={isActive}>
            <Popover.Trigger>
              {(attributes) => (
                <TextField
                  name={props.name}
                  defaultValue={`${quantity}`}
                  attributes={{
                    style: {
                      fontSize:
                        props.size === 'large'
                          ? 'var(--rs-font-size-body-2)'
                          : 'var(--rs-font-size-body-3)',
                      border: 0,
                      padding: 0,
                      boxShadow: 'none',
                    },
                  }}
                  inputAttributes={{
                    ...(attributes as any),
                    style: {
                      textAlign: 'center',
                    },
                  }}
                  onBlur={onBlurQuantityHandler}
                  size={props.sizeField}
                  hasError={isActive}
                />
              )}
            </Popover.Trigger>
            <Popover.Content>{message}</Popover.Content>
          </Popover>
        )}
      </View.Item>
      {props.showIcon && (
        <View.Item
          columns={props.showInPlp ? 3 : 2}
          gapBefore={props.showInPlp ? undefined : 'auto'}
        >
          <Link
            disabled={maxValue > 0 && Number(quantity) >= maxValue}
            onClick={onClickQuantityPlusHandler}
          >
            <View width={8} align="center" justify="center">
              <Icon svg={IconPlus} size={6} />
            </View>
          </Link>
        </View.Item>
      )}
    </View>
  );
};
export default QuantityCounter;
