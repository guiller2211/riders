import { Icon, View, Text } from '../../../atomic';
import { IconStarFill } from '../../../../icons';
import type { ProductRatingProps } from './ProductRating.types';

export const ProductRating = (props: ProductRatingProps) => {
  const { average, total } = props;
  return (
    <View gap={8} direction="row">
      <View.Item columns={7}>
        <View gap={2} direction="row" align="center">
          {average && (
            <View gap={2} direction="row" align="center">
              <Icon color="primary" svg={IconStarFill} />
              <Text variant="body-3" weight="bold" color="primary">
                {average}
              </Text>
            </View>
          )}
          {total && (
            <View>
              <Text variant="body-3" weight="medium" color="neutral-faded">
               Reseñas Totales: {total}
              </Text>
            </View>
          )}
        </View>
      </View.Item>
    </View>
  );
};
