import React from 'react';
import type { PopoverProps } from 'reshaped';
import { Popover as ReshapedPopover } from 'reshaped';

const Popover = (props: PopoverProps) => {
  return <ReshapedPopover {...props} />;
};
Popover.Content = ReshapedPopover.Content;
Popover.Trigger = ReshapedPopover.Trigger;
export default Popover;
