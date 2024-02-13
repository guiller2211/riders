import React from 'react';
import type { TooltipProps } from 'reshaped';
import { Tooltip as ReshapedTooltip } from 'reshaped';

const Tooltip = (props: TooltipProps) => {
  return <ReshapedTooltip {...props} />;
};
export default Tooltip;
