import { Accordion, Text, View } from '../../../atomic';
import type { ProductSpecificationsProps } from './ProductSpecifications.types';

export const ProductSpecifications = (props: ProductSpecificationsProps) => {
  return (
    <Accordion defaultActive={props.defaultActive}>
      <Accordion.Trigger>
        <View paddingBlock={6} paddingInline={0}>
          <Text variant="featured-3" weight="bold" color="neutral">
            Especificaciones
          </Text>
        </View>
      </Accordion.Trigger>

      <Accordion.Content>
        {props.specifications?.map((item, index) => (
          <View
            key={index}
            direction={{ l: 'row', s: 'column' }}
            backgroundColor={index % 2 !== 0 ? 'page-faded' : 'page'}
            borderRadius="small"
            paddingBlock={5}
            paddingInline={3}
            gap={2}
            align="start"
          >
            <View.Item columns={{ l: 3, s: 'auto' }}>
              <Text variant="body-2" weight="bold">
                {item.label}
              </Text>
            </View.Item>

            <View.Item grow>
              <Text variant="body-3" color="neutral-faded">
                {item.value}
              </Text>
            </View.Item>
          </View>
        ))}
        <View direction="row" backgroundColor="page" height={14} />
      </Accordion.Content>
    </Accordion>
  );
};
