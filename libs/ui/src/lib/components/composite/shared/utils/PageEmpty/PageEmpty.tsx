import { Button, Text, View } from '../../../../atomic';
import { PageEmptyProps } from './PageEmpty.types';
import { IconCart2 } from '../../../../../icons';

const PageEmpty = (props: PageEmptyProps) => {

  return (
    <View direction="row" gap={9}>
      <View.Item columns={12}>
        <View gap={2}>
          <View.Item columns={12}>
            <Text variant="body-2" weight='medium'>revisar</Text>
            <Text variant="body-3">cambiar</Text>
          </View.Item>
        </View>
      </View.Item>

      <View.Item columns={12}>
        <Button icon={IconCart2} size="xlarge" color="primary">
          click
        </Button>
      </View.Item>
      {props.showColumn && (
        <View.Item columns={12}>
          <View gap={1} direction="row">
            <View.Item>
              <Text variant='body-2' weight='bold'>seguir comprando</Text>
            </View.Item>
            <View.Item>
              <Text variant="body-3">seguir comprando</Text>
            </View.Item>
          </View>
        </View.Item>
      )}
    </View>
  );
};

export default PageEmpty;
