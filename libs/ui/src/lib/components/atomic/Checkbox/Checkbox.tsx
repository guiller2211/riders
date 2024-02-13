import React from 'react';
import type { CheckboxProps } from 'reshaped';
import { Checkbox as ReshapedCheckbox } from 'reshaped';

const Checkbox = (props: CheckboxProps) => {
  return <ReshapedCheckbox {...props} />;
};
export default Checkbox;
