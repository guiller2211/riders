import React from 'react';
import type { DismissibleProps } from 'reshaped';
import { Dismissible as ReshapedDismissible } from 'reshaped';

const Dismissible = (props: DismissibleProps) => {
  return <ReshapedDismissible {...props} />;
};
export default Dismissible;
