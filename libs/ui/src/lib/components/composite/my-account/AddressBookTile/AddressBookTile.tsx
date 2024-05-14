import { AppRoutes } from '@ducati/types';

import { IconArrowRight, IconJournal } from '../../../../icons';
import { Button, Card, Icon, Text, View } from '../../../atomic';

const AddressBookTile = () => {

  return (
    <Card padding={6}>
      <View direction="row" gap={3}>
        <View.Item columns="auto">
          <Icon svg={IconJournal} color="primary" size="medium" />
        </View.Item>
        <View.Item columns={10}>
          <View gap={4}>
            <Text color="primary" variant="featured-3" weight="bold">
              Libro de Direcciones
            </Text>
            <Text variant="body-3">
              Agregue sus direcciones preferidas y elija un favorito.
            </Text>
          </View>
          <View gap={0} paddingTop={12} align="start">
            <Button
              variant="ghost"
              color="primary"
              href={AppRoutes.AddressBook}
              endIcon={IconArrowRight}
            >
              Tus direcciones
            </Button>
          </View>
        </View.Item>
      </View>
    </Card>
  );
};
export default AddressBookTile;
