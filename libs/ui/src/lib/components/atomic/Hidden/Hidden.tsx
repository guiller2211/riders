import React from 'react';
import type { HiddenProps } from 'reshaped';
import { Hidden as ReshapedHidden } from 'reshaped';

const Hidden = (props: HiddenProps) => {
  return <ReshapedHidden {...props} />;
};
export default Hidden;
