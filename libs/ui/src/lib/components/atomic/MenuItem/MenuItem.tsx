import React from 'react';
import type { MenuItemProps } from 'reshaped';
import { MenuItem as ReshapedMenuItem } from 'reshaped';

const MenuItem = (props: MenuItemProps) => {
  return <ReshapedMenuItem {...props} />;
};

MenuItem.Aligner = ReshapedMenuItem.Aligner;
export default MenuItem;
