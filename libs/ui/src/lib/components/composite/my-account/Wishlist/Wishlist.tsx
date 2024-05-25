import { AppRoutes } from '@ducati/types';

import { IconArrowRight, IconHeart } from '../../../../icons';
import { Button, Card, Icon, Text, View } from '../../../atomic';

const WishlistTile = () => {

  return (
    <Card padding={6}>
      <View direction="row" gap={3}>
        <View.Item columns="auto">
          <Icon svg={IconHeart} color="primary" size="medium" />
        </View.Item>
        <View.Item columns={10}>
          <View gap={4}>
            <Text color="primary" variant="featured-3" weight="bold">
              Productos Deseados
            </Text>
            <Text variant="body-3">
              Ve tus productos Deseados
            </Text>
          </View>
          <View gap={0} paddingTop={12} align="start">
            <Button
              variant="ghost"
              color="primary"
              href={AppRoutes.WishList}
              endIcon={IconArrowRight}
            >
              Productos Deseados
            </Button>
          </View>
        </View.Item>
      </View>
    </Card>
  );
};
export default WishlistTile;
