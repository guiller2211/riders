import React from 'react';
import type { CheckboxGroupProps } from 'reshaped';
import { CheckboxGroup as ReshapedCheckboxGroup } from 'reshaped';

const CheckboxGroup = (props: CheckboxGroupProps) => {
  return <ReshapedCheckboxGroup {...props} />;
};
export default CheckboxGroup;
