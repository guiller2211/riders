import { View, Button } from '../../../atomic';
import { IconGridFill, IconListUl } from '../../../../icons';
import type { ProductGridListToggleForPLPPorps } from './ProductGridListToggleForPLP.types';

export const ProductGridListToggleForPLP = (
  props: ProductGridListToggleForPLPPorps,
) => {
  return (
    <View direction="row" align="center" gap={2}>
      <Button
        icon={IconGridFill}
        color="primary"
        variant={props.view ? 'solid' : 'outline'}
        attributes={{ 'aria-label': '1-click order' }}
        onClick={() => {
          props.isGridView(true);
        }}
      />

      <Button
        icon={IconListUl}
        color="primary"
        variant={!props.view ? 'solid' : 'outline'}
        attributes={{ 'aria-label': '1-click order' }}
        onClick={() => {
          props.isGridView(false);
        }}
      />
    </View>
  );
};
