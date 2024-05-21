import { View } from '../../../atomic';
import CartEntry from '../CartEntry';
import type { CartEntriesProps } from './CartEntries.types';

const CartEntries = (props: CartEntriesProps) => {
  const { entries, viewCart, handleAction } = props;

  return (
    <View gap={6} divided>
      {entries?.map((entry, index) => {
        const { entryId } = entry;
        return (
          <CartEntry
            key={`${entryId}-${index}`}
            viewCart={viewCart}
            entry={entry}
            handleAction={handleAction} />
        );
      })}
    </View>
  );
};
export default CartEntries;
