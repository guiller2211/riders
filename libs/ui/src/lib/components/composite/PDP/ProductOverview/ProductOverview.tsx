import { useState } from 'react';

import { Text, View, Link } from '../../../atomic';
import type { ProductOverviewProps } from './ProductOverview.types';

export const ProductOverview = (props: ProductOverviewProps) => {
  const { description, summary } = props;
  const [showLongDescription, setShowLongDescription] = useState(false);
  return (
    <View gap={3} direction="row">
      <View.Item columns={12}>
        <Text variant="featured-3" weight="bold" color="neutral">
        </Text>
      </View.Item>
      <View.Item columns={12}>
        <Text variant="body-2" color="neutral" maxLines={9}>
          {summary}
        </Text>
      </View.Item>
      {description && (
        <View.Item columns={12}>
          <View paddingTop={4}>
            <Link
              variant="underline"
              color="primary"
              onClick={() => setShowLongDescription(!showLongDescription)}
            >
              {showLongDescription
                ? 'Ver Menos'
                : 'Ver Mas'}
            </Link>
          </View>
        </View.Item>
      )}
      {showLongDescription && (
        <View.Item columns={12}>
          <View paddingTop={4}>
            <Text variant="body-2" color="neutral" maxLines={9}>
              {description}
            </Text>
          </View>
        </View.Item>
      )}
    </View>
  );
};

export default ProductOverview;
