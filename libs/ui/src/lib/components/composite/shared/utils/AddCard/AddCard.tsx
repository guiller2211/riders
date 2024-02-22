import { IconPlusCircle } from '../../../../../icons';
import { Card, Icon, Text, View } from '../../../../atomic';
import { AddCardProps } from './AddCard.types';

const AddCard = (props: AddCardProps) => {

  return (
    <Card padding={6}>
      <View direction="column" gap={3} height={props.height ? props.height : 48} align="center" justify="center">
        <Icon
          svg={IconPlusCircle}
          color="primary"
          attributes={{
            style: {
              width: 'var(--rs-unit-x8)',
              height: 'var(--rs-unit-x8)',
            },
          }}
        />
        <Text variant='body-2' weight='bold'>{props.label}</Text>
      </View>
    </Card>
  );
};
export default AddCard;
