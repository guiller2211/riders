import { View } from '../../../atomic';
import CartEntry from '../CartEntry';
import type { CartEntriesProps } from './CartEntries.types';

const CartEntries = (props: CartEntriesProps) => {
  return (
    <View gap={6} divided>
      {props.entries?.map((entry) => {
        const { entryId } = entry;
        return (
          <View.Item columns={12} key={entryId}>
            <CartEntry viewCart={props.viewCart} entry={entry} />
          </View.Item>
        );
      })}
    </View>
  );
};
export default CartEntries;
