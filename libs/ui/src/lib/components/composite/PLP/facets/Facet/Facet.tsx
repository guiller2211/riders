import React from 'react';
import { useState } from 'react';

import { Accordion, View, Text, Divider, Button } from '../../../../atomic';
import type { FacetProps } from './Facet.types';
import FacetValues from '../FacetValues';
import { IconDashSquare, IconPlusSquare } from '../../../../../icons';

const Facet = (props: FacetProps) => {
  const visibleLimit = props.visibleLimit ? props.visibleLimit : 5;
  const [showAll, setShowAll] = useState(false);

  return (
    <View paddingInline={2} animated borderRadius="medium">
      <View.Item>
        <Accordion defaultActive={props.isOpen}>
          <Accordion.Trigger>
            <View paddingTop={5} paddingBottom={5}>
              <Text variant="body-2" weight="bold">
                {props.name}
              </Text>
            </View>
          </Accordion.Trigger>
          <Accordion.Content>
            <View paddingTop={2}>
              <View direction="column" gap={4} paddingBottom={6}>
                {props.values?.map((values, index) => (
                  <FacetValues
                    key={index}
                    name={values.name}
                    type={values.type}
                    quantity={values.quantity}
                    selected={values.selected}
                    visible={index < visibleLimit || showAll}
                  />
                ))}
                {props.values.length >= visibleLimit && (
                  <View paddingTop={2}>
                    <Button
                      variant="ghost"
                      color="primary"
                      endIcon={showAll ? IconDashSquare : IconPlusSquare}
                      onClick={() => setShowAll(!showAll)}
                    >
                      See {showAll ? 'less' : 'more'}
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </Accordion.Content>
        </Accordion>
      </View.Item>
      <Divider />
    </View>
  );
};

export default Facet;
