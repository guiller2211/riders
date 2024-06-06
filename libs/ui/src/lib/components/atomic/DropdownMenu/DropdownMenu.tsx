import React from 'react';
import type { DropdownMenuProps } from 'reshaped';
import { DropdownMenu as ReshapedDropdownMenu } from 'reshaped';

import Popover from '../Popover';

const DropdownMenu = (props: DropdownMenuProps) => {
  return <ReshapedDropdownMenu {...props} />;
};

DropdownMenu.Trigger = Popover.Trigger;
DropdownMenu.Content = ReshapedDropdownMenu.Content;
DropdownMenu.Section = ReshapedDropdownMenu.Section;
DropdownMenu.Item = ReshapedDropdownMenu.Item;
DropdownMenu.SubMenu = ReshapedDropdownMenu.SubMenu;
DropdownMenu.SubTrigger = ReshapedDropdownMenu.SubTrigger;
export default DropdownMenu;
