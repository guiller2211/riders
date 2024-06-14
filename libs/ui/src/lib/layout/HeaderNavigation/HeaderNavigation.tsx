import { AppRoutes, type UIComposedProps } from '@riders/types';

import {
  Button,
  DropdownMenu,
  Icon,
  Text,
  View,
} from '../../components/atomic';
import { IconChevronDown, IconHome } from '../../icons';

export const HeaderNavigation = (props: { nodes: UIComposedProps[] }) => {
  const { nodes } = props;
  return (
    <View gap={2} direction="row" >
      {nodes?.map((nav, i) => {
        return nav.nodes && nav.nodes.length > 0 ? (
          <DropdownMenu key={i}>
            <DropdownMenu.Trigger>
              {(attributes: any) => (
                <Button
                  variant="ghost"
                  color="inherit"
                  endIcon={IconChevronDown}
                  attributes={attributes}
                >
                  <Text color="warning" variant="body-3" weight="medium">
                    {nav.button?.message}
                  </Text>
                </Button>
              )}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {nav.nodes?.map((node, i) => {
                return (
                  <DropdownMenu.Item
                    href={node.button?.props?.href}
                    key={i}
                    attributes={node.button?.props?.href === AppRoutes.Me ? { target: "_blank" } : {}}>
                    <Text variant="body-3" weight="medium">
                      {node.button?.message}
                    </Text>
                  </DropdownMenu.Item>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            color="inherit"
            href={nav.button?.props?.href}
            key={i}>
            <Text color="warning" variant="body-3" weight="medium">
              {nav.button?.message}
            </Text>
          </Button>
        );
      })}
    </View>
  );
};
