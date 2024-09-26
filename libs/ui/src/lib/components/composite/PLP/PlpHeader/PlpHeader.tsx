import type { PlpHeaderProps } from './PlpHeader.types';
import { Text, View } from '../../../atomic';
import { CategoryBreadcrumb } from '../../shared';

export const PlpHeader = (props: PlpHeaderProps) => {
  const { categoryName = '', category, ...rest } = props;

  return (
    <View gap={3} divided {...rest}>
      <CategoryBreadcrumb category={category} />
      <Text variant="title-6">
        {categoryName}
      </Text>
    </View>
  );
};
