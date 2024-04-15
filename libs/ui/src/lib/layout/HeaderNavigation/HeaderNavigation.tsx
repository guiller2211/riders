import { AppRoutes, type UIComposedProps } from '@backoffice/types';

import {
  Accordion,
  Button,
  Divider,
  Link,
  Text,
  View,
} from '../../components/atomic';
import { HeaderUserProps } from '../HeaderUser';
import React from 'react';

export const HeaderNavigation = (props: { nodes: UIComposedProps[], user: HeaderUserProps; }) => {
  const { nodes } = props;
  return (
    <View gap={10} direction="column" padding={6}>
      {nodes?.map((nav, index) => {
        return nav.nodes && nav.nodes.length > 0 ? (
          <Accordion key={`accordion-${index}`}>
            <Accordion.Trigger>
              <Text color='warning' variant="featured-3" weight="medium">
                {nav.button?.message}
              </Text>
            </Accordion.Trigger>
            <Accordion.Content>
              {nav.nodes?.map((node, subIndex) => {
                return (
                  <Link key={`link-${subIndex}`} href={node.button?.props?.href} variant='plain' color='inherit'>
                    <Text variant="featured-3" weight="medium">
                      {node.button?.message}
                    </Text>
                  </Link>
                );
              })}
            </Accordion.Content>
          </Accordion>
        ) : (
          <React.Fragment key={`fragment-${index}`}>
            <Divider key={`divider-${index}`} />
            <Button
              variant="ghost"
              color="inherit"
              href={nav.button?.props?.href}
              key={`button-${index}`}>
              <Text color="warning" variant="body-3" weight="medium">
                {nav.button?.message}
              </Text>
            </Button>
          </React.Fragment>
        );
      })}
    </View>

  );
};
