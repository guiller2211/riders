import { Facet } from '../index';
import { IconSliders } from '../../../../../icons';
import { View, Button, Accordion, Text } from '../../../../atomic';
import type { FacetsProps } from './Facets.types';
import styles from './Facets.module.css';

const Facets = (props: FacetsProps) => {
  const { facets } = props;
  return (
    <View>

      <View className={styles['non-mobile-screen']}>
        <View direction="column" gap={8}>
          <View.Item columns={12}>
            {facets?.map((facet, index) => (
              <Facet
                key={index}
                name={facet.name}
                values={facet.values}
                isOpen={facet.isOpen}
                visibleLimit={facet.visibleLimit}
              />
            ))}
          </View.Item>
        </View>
      </View>

      <View className={styles['mobile-screen']}>
        <View direction="column" gap={8}>
          <View.Item columns={12}>
            <Accordion>
              <Accordion.Trigger>
                {(attributes, { active }) => (
                  <Button
                    icon={IconSliders}
                    size="xlarge"
                    color="primary"
                    variant="outline"
                    attributes={attributes}
                    highlighted={active}
                    fullWidth
                  >
                    Filtro de categorias
                  </Button>
                )}
              </Accordion.Trigger>
              <Accordion.Content>
                {facets?.map((facet, index) => (
                  <Facet
                    key={index}
                    name={facet.name}
                    values={facet.values}
                    isOpen={facet.isOpen}
                    visibleLimit={facet.visibleLimit}
                  />
                ))}
              </Accordion.Content>
            </Accordion>
          </View.Item>
        </View>
      </View>

    </View>
  );
};

export default Facets;
