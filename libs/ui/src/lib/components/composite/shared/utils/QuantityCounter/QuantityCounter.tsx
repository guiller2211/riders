import { useState } from 'react';
import { IconDash, IconPlus } from '../../../../../icons';
import { View, Icon, TextField, Link } from '../../../../atomic';
import { QuantityCounterProps } from "./QuantityCounter.types";

const QuantityCounter = (props: QuantityCounterProps) => {
  const [ quantity, setQuantity ] = useState(`${props.min}`);

  const quantityChanged = (quantity: number) => {
    if (!quantity || (quantity >= props.min && quantity <= props.max)) {
      if (quantity !== 0){
        setQuantity(`${quantity}`);
        props.changed(quantity)
      } else {
        setQuantity('');
      }
    }
  }
  return (
    <View
      direction="row"
      wrap={false}
      borderColor="neutral"
      borderRadius="small"
      align="center"
      width={25}
      height={props.size === 'large' ? 14 : 9}
    >
      <View.Item columns={4}>
        <Link disabled={Number(quantity) <= props.min}
          onClick={() => quantityChanged(Number(quantity) - props.step)}>
          <View width={8} align='center' justify='center'>
            <Icon svg={IconDash} size={4} />
          </View>
        </Link>
      </View.Item>
      <View.Item columns={4}>
        <TextField name={props.name}
          value={`${quantity}`}
          attributes={{
            style: {
              fontSize: props.size === 'large' ? 'var(--rs-font-size-body-2)' : 'var(--rs-font-size-body-3)',
              border: 0,
              padding: 0,
              boxShadow: 'none',
            }
          }}
          inputAttributes={{
            style: { textAlign: 'center' }
          }}
          onChange={(e) => quantityChanged(Number(e.value))}
        />
      </View.Item>
      <View.Item columns={4}>
        <Link disabled={Number(quantity) >= props.max} onClick={() =>
            quantityChanged(Number(quantity) + props.step)}>
          <View width={8} align='center' justify='center'>
            <Icon svg={IconPlus} size={4} />
          </View>
        </Link>
      </View.Item>
    </View>
  );
}
export default QuantityCounter;
